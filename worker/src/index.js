const ALLOWED_ORIGINS = [
  "https://luy869.net",
  "https://www.luy869.net",
];

// ウィジェットが実際に使う経路だけを転送する明示的なホワイトリスト。
// Origin ヘッダーは curl 等の非ブラウザクライアントからは自由に偽装できるため
// （実測済み: `curl -H "Origin: https://luy869.net" ...` は 403 を回避できる）、
// Origin チェック単体は認証にならない。X-API-Key もこの Worker が全リクエストに
// 一律で自動付与してしまうため、「キーを持っている＝正規の呼び出し元」という
// 前提も成立しない。よって、そもそも管理系エンドポイント（documents/upload・
// collections の作成/削除・system-prompt 変更など）をこの Worker 経由で到達
// できないようにするのが実効的な防御になる。管理操作はサーバー上で直接
// （SSH + localhost 宛リクエストや job-hunting-rag/ の直呼びスクリプト）行う運用とする。
const ALLOWED_PATHS = [
  { method: "POST", pattern: /^\/api\/chat\/?$/ },
  { method: "GET", pattern: /^\/api\/health\/?$/ },
];

function isAllowedPath(method, pathname) {
  return ALLOWED_PATHS.some(
    (rule) => rule.method === method && rule.pattern.test(pathname)
  );
}

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

    // Origin チェック（未設定・許可外は 403。POSTには必ずOriginが付くため正規利用は壊れない）
    // ※ 前述の通りこれは非ブラウザクライアントに対する防御にはならない。
    //   下のパスホワイトリストが実質的な防御レイヤー。
    if (!ALLOWED_ORIGINS.includes(origin)) {
      return new Response("Forbidden", { status: 403 });
    }

    // このWorkerが公開する経路はチャット送信とヘルスチェックのみ。
    // documents/collections 等の管理系エンドポイントはここから到達不能にする。
    if (!isAllowedPath(request.method, url.pathname)) {
      return new Response("Forbidden", { status: 403 });
    }

    // /api/* → nginx の /api/* ルートに転送（プレフィックスを保持）
    const backendUrl = env.BACKEND_URL + url.pathname + url.search;

    // 転送ヘッダーはホワイトリスト化し、必要なものだけコピーする
    const backendHeaders = new Headers();
    const contentType = request.headers.get("Content-Type");
    if (contentType) {
      backendHeaders.set("Content-Type", contentType);
    }
    const accept = request.headers.get("Accept");
    if (accept) {
      backendHeaders.set("Accept", accept);
    }
    if (env.API_KEY) {
      backendHeaders.set("X-API-Key", env.API_KEY);
    }

    const backendRequest = new Request(backendUrl, {
      method: request.method,
      headers: backendHeaders,
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
