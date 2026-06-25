import { useState, useRef, useEffect } from "react";
import Markdown from "markdown-to-jsx";

const API_URL = "https://luy869.net/api/chat/";
const COLLECTION_NAME = "default";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: "こんにちは！ゆうについて何でも聞いてください。\nHi! Feel free to ask me anything about Yu.",
        },
      ]);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    const question = input.trim();
    if (!question || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setLoading(true);

    // アシスタントメッセージのプレースホルダーを追加
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          collection_name: COLLECTION_NAME,
          stream: true,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = JSON.parse(line.slice(6));
          if (data.type === "chunk") {
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                role: "assistant",
                content: updated[updated.length - 1].content + data.content,
              };
              return updated;
            });
          }
        }
      }
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "エラーが発生しました。しばらくしてから再試行してください。",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  const CYAN = "#00ffd5";
  const DARK_HEADER = "#0f1422";
  const BORDER_NEON = "rgba(0,255,213,0.35)";

  return (
    <div style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.75rem" }}>
      {open && (
        <div style={{ border: `1px solid ${BORDER_NEON}`, boxShadow: `0 0 20px rgba(0,255,213,0.15), 0 8px 40px rgba(0,0,0,0.5)` }} className="flex flex-col w-80 sm:w-96 h-[28rem] rounded-2xl overflow-hidden">
          {/* ヘッダー：ダーク＋シアン */}
          <div style={{ background: DARK_HEADER, borderBottom: `1px solid ${BORDER_NEON}` }} className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <div style={{ background: CYAN, boxShadow: `0 0 6px ${CYAN}` }} className="w-2 h-2 rounded-full" />
              <span className="font-semibold text-sm text-white">AIチャット</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white transition-colors text-lg leading-none">×</button>
          </div>

          {/* メッセージ一覧：白背景で読みやすく */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "text-white rounded-br-sm whitespace-pre-wrap"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
                  }`}
                  style={msg.role === "user" ? { background: "#0d7a6b" } : {}}
                >
                  {msg.role === "assistant" ? (
                    <Markdown
                      options={{
                        overrides: {
                          p: { props: { className: "mb-2 last:mb-0" } },
                          ul: { props: { className: "list-disc pl-4 mb-2 space-y-0.5" } },
                          ol: { props: { className: "list-decimal pl-4 mb-2 space-y-0.5" } },
                          strong: { props: { className: "font-semibold" } },
                          code: { props: { className: "bg-gray-100 px-1 py-0.5 rounded text-xs font-mono" } },
                          pre: { props: { className: "bg-gray-100 p-2 rounded text-xs font-mono overflow-x-auto mb-2 whitespace-pre-wrap" } },
                          a: { props: { className: "underline", style: { color: "#0d7a6b" }, target: "_blank", rel: "noopener noreferrer" } },
                        },
                      }}
                    >
                      {msg.content}
                    </Markdown>
                  ) : (
                    msg.content
                  )}
                  {msg.role === "assistant" && loading && i === messages.length - 1 && msg.content === "" && (
                    <span className="inline-flex gap-1 text-gray-400">
                      <span className="animate-bounce" style={{ animationDelay: "0ms" }}>·</span>
                      <span className="animate-bounce" style={{ animationDelay: "150ms" }}>·</span>
                      <span className="animate-bounce" style={{ animationDelay: "300ms" }}>·</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* 入力欄：白背景 */}
          <div className="flex items-end gap-2 px-3 py-3 border-t border-gray-200 bg-white">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="質問を入力... / Ask anything..."
              rows={1}
              disabled={loading}
              className="flex-1 resize-none border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-gray-400 disabled:opacity-50 max-h-24 overflow-y-auto"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              style={{ background: DARK_HEADER, borderColor: BORDER_NEON, color: CYAN }}
              className="flex-shrink-0 w-9 h-9 border rounded-xl flex items-center justify-center disabled:opacity-40 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* トグルボタン */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{ background: DARK_HEADER, border: `1px solid ${BORDER_NEON}`, color: CYAN, boxShadow: `0 0 16px rgba(0,255,213,0.2)` }}
        className="w-14 h-14 rounded-full flex items-center justify-center transition-colors"
        aria-label="チャットを開く"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
