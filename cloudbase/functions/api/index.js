const DEFAULT_UPSTREAM = "https://jiale-cloudbase-relay.pages.dev";
const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
]);
const TEXT_RESPONSE_LIMIT = 5.5 * 1024 * 1024;
const BINARY_RESPONSE_LIMIT = 4 * 1024 * 1024;

function upstreamOrigin(value) {
  const url = new URL(value || DEFAULT_UPSTREAM);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("CLOUDFLARE_UPSTREAM must use http or https");
  }
  return url.origin;
}

function rawRequestPath(event) {
  return event.path || event.rawPath || event.requestContext?.path || event.requestContext?.http?.path || "/api";
}

function normalizePath(pathname) {
  if (pathname.startsWith("/api")) return pathname;
  return `/api${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

function requestQuery(event) {
  if (typeof event.rawQueryString === "string" && event.rawQueryString) return event.rawQueryString;
  const params = new URLSearchParams();
  for (const [key, values] of Object.entries(event.multiValueQueryStringParameters || {})) {
    for (const value of Array.isArray(values) ? values : [values]) {
      if (value !== undefined && value !== null) params.append(key, String(value));
    }
  }
  for (const [key, value] of Object.entries(event.queryStringParameters || {})) {
    if (params.has(key) || value === undefined || value === null) continue;
    params.append(key, String(value));
  }
  return params.toString();
}

function requestMethod(event) {
  return String(event.httpMethod || event.requestContext?.http?.method || event.requestContext?.httpMethod || "GET").toUpperCase();
}

function requestBody(event, method) {
  if (method === "GET" || method === "HEAD" || event.body === undefined || event.body === null) return undefined;
  if (Buffer.isBuffer(event.body)) return event.body;
  if (event.isBase64Encoded) return Buffer.from(String(event.body), "base64");
  return Buffer.from(typeof event.body === "string" ? event.body : JSON.stringify(event.body));
}

function forwardHeaders(event, incomingHost) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(event.headers || {})) {
    const lower = name.toLowerCase();
    if (HOP_BY_HOP_HEADERS.has(lower) || lower === "host" || lower === "content-length") continue;
    if (value !== undefined && value !== null) headers.set(name, String(value));
  }
  if (incomingHost) headers.set("x-forwarded-host", incomingHost);
  headers.set("x-forwarded-proto", "https");
  return headers;
}

function isTextContentType(contentType) {
  const value = String(contentType || "").toLowerCase();
  return value.startsWith("text/") || value.includes("json") || value.includes("javascript") || value.includes("xml") || value.includes("x-www-form-urlencoded") || value.includes("x-ndjson") || value.includes("svg+xml");
}

function buildResponseHeaders(response, incomingHost, origin) {
  const headers = {};
  response.headers.forEach((value, name) => {
    const lower = name.toLowerCase();
    if (HOP_BY_HOP_HEADERS.has(lower) || lower === "content-length" || lower === "content-encoding") return;
    headers[name] = value;
  });
  headers["cache-control"] = "private, no-store, no-cache, max-age=0, must-revalidate";
  headers.pragma = "no-cache";
  headers.expires = "0";
  headers["x-content-type-options"] = "nosniff";
  headers["x-ai-exam-proxy"] = "cloudbase-http";

  if (headers.location && incomingHost) {
    try {
      const redirect = new URL(headers.location, origin);
      if (redirect.origin === origin) {
        headers.location = new URL(`${redirect.pathname}${redirect.search}${redirect.hash}`, `https://${incomingHost}`).toString();
      }
    } catch {
      // Preserve malformed or non-standard upstream locations as-is.
    }
  }
  return headers;
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "private, no-store, no-cache, max-age=0, must-revalidate",
      pragma: "no-cache",
      expires: "0",
      "x-content-type-options": "nosniff",
      "x-ai-exam-proxy": "cloudbase-http",
    },
    body: JSON.stringify(body),
    isBase64Encoded: false,
  };
}

exports.main = async (event = {}) => {
  try {
    const origin = upstreamOrigin(process.env.CLOUDFLARE_UPSTREAM);
    const path = normalizePath(rawRequestPath(event));
    const query = requestQuery(event);
    const target = new URL(path + (query ? `?${query}` : ""), origin);
    const method = requestMethod(event);
    const incomingHost = event.headers?.host || event.headers?.Host || "";
    const response = await fetch(target, {
      method,
      headers: forwardHeaders(event, incomingHost),
      body: requestBody(event, method),
      redirect: "manual",
    });

    const bytes = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const text = isTextContentType(contentType);
    const limit = text ? TEXT_RESPONSE_LIMIT : BINARY_RESPONSE_LIMIT;
    if (bytes.length > limit) {
      return jsonResponse(413, {
        detail: "免费国内接口单次响应超过 CloudBase 云函数限制，请缩小文件或使用国际站。",
        proxy: "cloudbase-http",
        max_bytes: limit,
      });
    }

    return {
      statusCode: response.status,
      headers: buildResponseHeaders(response, incomingHost, origin),
      body: text ? bytes.toString("utf8") : bytes.toString("base64"),
      isBase64Encoded: !text,
    };
  } catch (error) {
    console.error("CloudBase API proxy failed", error);
    return jsonResponse(502, {
      detail: "免费国内接口暂时无法连接服务，请稍后重试。",
      proxy: "cloudbase-http",
    });
  }
};

module.exports.normalizePath = normalizePath;
