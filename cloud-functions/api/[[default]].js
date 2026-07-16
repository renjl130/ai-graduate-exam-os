export default async function onRequest({ request, env }) {
  const upstream = env.CLOUDFLARE_UPSTREAM || "https://ai-graduate-exam-os.renjl130-ai-exam.workers.dev";
  const incoming = new URL(request.url);
  const target = new URL(incoming.pathname + incoming.search, upstream);
  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.set("x-forwarded-host", incoming.host);
  const init = {
    method: request.method,
    headers,
    redirect: "manual",
  };
  if (request.method !== "GET" && request.method !== "HEAD") init.body = request.body;
  const response = await fetch(target, init);
  const responseHeaders = new Headers(response.headers);
  responseHeaders.set("x-ai-exam-proxy", "edgeone-pages");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}