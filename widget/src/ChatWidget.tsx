import { useState, useRef, useEffect } from "react";

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

  return (
    <div style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.75rem" }}>
      {open && (
        <div className="flex flex-col w-80 sm:w-96 h-[28rem] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* ヘッダー */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="font-semibold text-sm">チャットボット</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white transition-colors text-lg leading-none"
            >
              ×
            </button>
          </div>

          {/* メッセージ一覧 */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-sm whitespace-pre-wrap leading-relaxed ${msg.role === "user"
                      ? "bg-gray-900 text-white rounded-br-sm"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
                    }`}
                >
                  {msg.content}
                  {msg.role === "assistant" && loading && i === messages.length - 1 && msg.content === "" && (
                    <span className="inline-flex gap-1">
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

          {/* 入力欄 */}
          <div className="flex items-end gap-2 px-3 py-3 border-t border-gray-200 bg-white">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="質問を入力... / Ask anything..."
              rows={1}
              disabled={loading}
              className="flex-1 resize-none border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-gray-500 disabled:opacity-50 max-h-24 overflow-y-auto"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="flex-shrink-0 w-9 h-9 bg-gray-900 text-white rounded-xl flex items-center justify-center hover:bg-gray-700 disabled:opacity-40 transition-colors"
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
        className="w-14 h-14 bg-gray-900 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
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
