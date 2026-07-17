const UPSTREAM = "https://ai-graduate-exam-os.renjl130-ai-exam.workers.dev";
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

export default {
  async fetch(request) {
    const incoming = new URL(request.url);
    if (!incoming.pathname.startsWith("/api")) {
      return Response.json({
        name: "佳乐考研 CloudBase Relay",
        status: "ok",
        purpose: "server-to-server relay",
      });
    }

    try {
      const target = new URL(incoming.pathname + incoming.search, UPSTREAM);
      const headers = new Headers(request.headers);
      for (const name of HOP_BY_HOP_HEADERS) headers.delete(name);
      headers.delete("host");
      headers.delete("content-length");
      headers.set("x-ai-exam-relay", "cloudflare-pages");

      const init = {
        method: request.method,
        headers,
        redirect: "manual",
      };
      if (request.method !== "GET" && request.method !== "HEAD") init.body = request.body;

      const response = await fetch(target, init);
      const responseHeaders = new Headers(response.headers);
      for (const name of HOP_BY_HOP_HEADERS) responseHeaders.delete(name);
      responseHeaders.delete("content-length");
      responseHeaders.set("cache-control", "private, no-store, no-cache, max-age=0, must-revalidate");
      responseHeaders.set("x-ai-exam-relay", "cloudflare-pages");

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
    } catch (error) {
      console.error("Cloudflare Pages relay failed", error);
      return Response.json(
        { detail: "Relay unavailable", relay: "cloudflare-pages" },
        { status: 502, headers: { "cache-control": "no-store" } },
      );
    }
  },
};
