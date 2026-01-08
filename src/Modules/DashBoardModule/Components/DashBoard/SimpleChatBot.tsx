import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";

type Msg = { role: "user" | "assistant"; content: string };

function normalize(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s]/gu, ""); // يشيل علامات الترقيم (عربي/انجليزي)
}

export default function SimpleChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "أهلًا 👋 أنا شات بسيط. اسأليني عن: tasks / projects / users / help" },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // ردود ثابتة
  const replies = useMemo(
    () => [
      {
        keywords: ["help", "مساعدة", "ساعد", "ازاي", "كيفية", "how"],
        reply:
          "ممكن تسأليني مثلًا: (عدد التاسكات) أو (إضافة مشروع) أو (المستخدمين).",
      },
      {
        keywords: ["task", "tasks", "تاسك", "تاسكات", "مهام"],
        reply:
          "بخصوص المهام: تقدري تروحي لصفحة Tasks وتضيفي Task جديدة من زر +. لو عايزة أربطها بAPI بعدين قولي.",
      },
      {
        keywords: ["project", "projects", "مشروع", "مشاريع"],
        reply:
          "المشاريع: من صفحة Projects تقدري تضيفي مشروع جديد وتتابعي المهام المرتبطة بيه.",
      },
      {
        keywords: ["user", "users", "مستخدم", "مستخدمين"],
        reply:
          "المستخدمين: تقدري تشوفي Active/Inactive من صفحة Users أو الداشبورد.",
      },
      {
        keywords: ["login", "تسجيل", "دخول", "auth", "token"],
        reply:
          "لو عندك مشكلة تسجيل دخول: اتأكدي من الـ token في localStorage وإن الـ API بيرجع 200 مش 401.",
      },
      {
        keywords: ["thanks", "thank", "شكرا", "شكرًا", "تمام", "اوكي", "ok"],
        reply: "العفو 🙌 لو تحبي أضيف اختيارات سريعة (buttons) جوه الشات قولي.",
      },
    ],
    []
  );

  const getReply = (text: string) => {
    const t = normalize(text);

    // لو الرسالة قصيرة جدًا
    if (t.length < 2) return "اكتبي سؤال أو كلمة وأنا هساعدك.";

    // Match by keywords
    for (const item of replies) {
      if (item.keywords.some((k) => t.includes(normalize(k)))) {
        return item.reply;
      }
    }

    // Default fallback
    return "مش فاهم قصدك بالظبط 😅 جرّبي: help / tasks / projects / users";
  };

  const send = () => {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");

    const botReply = getReply(text);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: botReply }]);
    }, 250);
  };

  return (
    <>
      {/* زرار فتح الشات */}
      <Button
        onClick={() => setOpen((v) => !v)}
        className="rounded-circle shadow"
        style={{
          position: "fixed",
          bottom: 18,
          right: 18,
          width: 56,
          height: 56,
          zIndex: 9999,
        }}
      >
        <i className="bi bi-chat-dots" />
      </Button>

      {/* نافذة الشات */}
      {open && (
        <div
          className="bg-white shadow rounded-4"
          style={{
            position: "fixed",
            bottom: 86,
            right: 18,
            width: 360,
            maxWidth: "calc(100vw - 36px)",
            height: 480,
            zIndex: 9999,
            overflow: "hidden",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
            <div className="fw-semibold">Simple Bot</div>
            <button className="btn btn-sm btn-light" onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>

          <div className="p-3" style={{ height: 360, overflowY: "auto", background: "#fafafa" }}>
            {messages.map((m, idx) => (
              <div key={idx} className={`d-flex mb-2 ${m.role === "user" ? "justify-content-end" : ""}`}>
                <div
                  className="px-3 py-2 rounded-4"
                  style={{
                    maxWidth: "80%",
                    background: m.role === "user" ? "#F4A21B" : "#fff",
                    color: m.role === "user" ? "#fff" : "#111",
                    border: m.role === "user" ? "none" : "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="p-3 border-top">
            <div className="d-flex gap-2">
              <Form.Control
                value={input}
                placeholder="اكتبي رسالتك…"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    send();
                  }
                }}
              />
              <Button onClick={send}>
                <i className="bi bi-send" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
