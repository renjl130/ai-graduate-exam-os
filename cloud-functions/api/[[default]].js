const DEFAULT_UPSTREAM = "https://ai-graduate-exam-os.renjl130-ai-exam.workers.dev";
const HOP_BY_HOP_HEADERS = [
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
];

function getUpstreamOrigin(value) {
  const url = new URL(value || DEFAULT_UPSTREAM);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("CLOUDFLARE_UPSTREAM must use http or https");
  }
  return url.origin;
}

function stripHopByHopHeaders(headers) {
  for (const name of HOP_BY_HOP_HEADERS) headers.delete(name);
}

export default async function onRequest({ request, env }) {
  const incoming = new URL(request.url);

  try {
    const upstreamOrigin = getUpstreamOrigin(env?.CLOUDFLARE_UPSTREAM);
    if (upstreamOrigin === incoming.origin) {
      throw new Error("CLOUDFLARE_UPSTREAM cannot point to the EdgeOne mirror itself");
    }

    const target = new URL(incoming.pathname + incoming.search, upstreamOrigin);
    const requestHeaders = new Headers(request.headers);
    stripHopByHopHeaders(requestHeaders);
    requestHeaders.delete("host");
    requestHeaders.delete("content-length");
    requestHeaders.set("x-forwarded-host", incoming.host);
    requestHeaders.set("x-forwarded-proto", incoming.protocol.slice(0, -1));

    const init = {
      method: request.method,
      headers: requestHeaders,
      redirect: "manual",
    };

    if (request.method !== "GET" && request.method !== "HEAD") {
      init.body = request.body;
      // Required by Node.js fetch when forwarding a streaming request body.
      init.duplex = "half";
    }

    const response = await fetch(target, init);
    const responseHeaders = new Headers(response.headers);
    stripHopByHopHeaders(responseHeaders);

    // Node.js fetch may transparently decode an upstream response. Let EdgeOne
    // recalculate transport headers for the forwarded stream.
    responseHeaders.delete("content-encoding");
    responseHeaders.delete("content-length");
    responseHeaders.set("cache-control", "no-store");
    responseHeaders.set("x-ai-exam-proxy", "edgeone-pages");

    const location = responseHeaders.get("location");
    if (location) {
      const redirectTarget = new URL(location, upstreamOrigin);
      if (redirectTarget.origin === upstreamOrigin) {
        redirectTarget.protocol = incoming.protocol;
        redirectTarget.hostname = incoming.hostname;
        redirectTarget.port = incoming.port;
        responseHeaders.set("location", redirectTarget.toString());
      }
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("EdgeOne API proxy failed", error);
    return Response.json(
      {
        detail: "国内镜像暂时无法连接服务，请稍后重试。",
        proxy: "edgeone-pages",
      },
      {
        status: 502,
        headers: {
          "cache-control": "no-store",
          "x-ai-exam-proxy": "edgeone-pages",
        },
      },
    );
  }
}
