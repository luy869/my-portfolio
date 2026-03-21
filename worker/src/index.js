const ALLOWED_ORIGINS = [
  "https://luy869.net",
  "https://www.luy869.net",
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";

    // CORS preflight
    if (request.method === "OPTIONS") {
      if (ALLOWED_ORIGINS.includes(origin)) {
        return new Response(null, {
          status: 204,
          headers: corsHeaders(origin),
        });
      }
      return new Response("Forbidden", { status: 403 });
    }

    // Origin チェック（ブラウザリクエスト）
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return new Response("Forbidden", { status: 403 });
    }

    // /api/* → nginx の /api/* ルートに転送（プレフィックスを保持）
    const backendUrl = env.BACKEND_URL + url.pathname + url.search;

    const backendRequest = new Request(backendUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });

    const response = await fetch(backendRequest);

    // CORS ヘッダーを付けてレスポンスを返す
    const newHeaders = new Headers(response.headers);
    if (origin) {
      Object.entries(corsHeaders(origin)).forEach(([k, v]) =>
        newHeaders.set(k, v)
      );
    }

    return new Response(response.body, {
      status: response.status,
      headers: newHeaders,
    });
  },
};

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
