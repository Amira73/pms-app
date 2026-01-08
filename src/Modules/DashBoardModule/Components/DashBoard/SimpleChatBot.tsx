import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import type { AxiosError } from "axios";
import { http } from "../../../../Services/Api/httpInstance";
import { TASK_URLS } from "../../../../Services/Api/ApisUrls";

type Msg = { role: "user" | "assistant"; content: string };

type CountResponse = {
  toDo: number;
  inProgress: number;
  done: number;
};

function normalize(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s]/gu, " "); 
}

export default function SimpleChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "أهلًا 👋 اسأليني مثلًا: (عدد التاسكات) أو (tasks count) أو (help).",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const replies = useMemo(
    () => [
      { keywords: ["ameera", "اميره"], reply: "بحبك يا اميره" },
      {
        keywords: ["مجهود", "effort"],
        reply: "شكرا على دعمك ومجهودك ويارب upskilling من نجاح لنجاخ",
      },
      { keywords: ["nadia", "ناديه"], reply: "بحبك يا مهندسه ناديه" },

      {
        keywords: ["help", "مساعدة", "ساعد", "ازاي", "كيفية", "how"],
        reply: "ممكن تسأليني مثلًا: (عدد التاسكات) أو (إضافة مشروع) أو (المستخدمين).",
      },
      {
        keywords: ["task", "tasks", "تاسك", "تاسكات", "مهام"],
        reply:
          "بخصوص المهام: تقدري تروحي لصفحة Tasks وتضيفي Task جديدة من زر +.",
      },
      {
        keywords: ["project", "projects", "مشروع", "مشاريع"],
        reply:
          "المشاريع: من صفحة Projects تقدري تضيفي مشروع جديد وتتابعي المهام المرتبطة بيه.",
      },
      {
        keywords: ["user", "users", "مستخدم", "مستخدمين"],
        reply: "المستخدمين: تقدري تشوفي Active/Inactive من صفحة Users أو الداشبورد.",
      },
      {
        keywords: ["login", "تسجيل", "دخول", "auth", "token"],
        reply:
          "لو عندك مشكلة تسجيل دخول: اتأكدي من الـ token في localStorage وإن الـ API بيرجع 200 مش 401.",
      },
      {
        keywords: ["thanks", "thank", "شكرا", "شكرًا", "تمام", "اوكي", "ok"],
        reply: "العفو 🙌",
      },
    ],
    []
  );

  // ✅ Detect لو السؤال محتاج API
  const wantsTasksCount = (text: string) => {
    const t = normalize(text);

    const hasTasks = ["task", "tasks", "تاسك", "تاسكات", "مهام"].some((k) =>
      t.includes(normalize(k))
    );

    const hasCount = ["count", "عدد", "كام", "كم", "احص", "إحص", "statistics", "stats"].some(
      (k) => t.includes(normalize(k))
    );

    return hasTasks && hasCount;
  };

  const getReplyLocal = (text: string) => {
    const t = normalize(text);
    if (t.length < 2) return "اكتبي سؤال أو كلمة وأنا هساعدك.";

    for (const item of replies) {
      if (item.keywords.some((k) => t.includes(normalize(k)))) {
        return item.reply;
      }
    }
    return "مش فاهم قصدك بالظبط 😅 جرّبي: (عدد التاسكات) أو (help)";
  };

  const getTasksCountFromApi = async () => {
    const res = await http.get<CountResponse>(TASK_URLS.COUNT_TASKS);
    const c = res.data;
    return `إحصائيات التاسكات 👇
ToDo: ${c.toDo}
In Progress: ${c.inProgress}
Done: ${c.done}`;
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");

    // ✅ لو السؤال محتاج API
    if (wantsTasksCount(text)) {
      setLoading(true);
      try {
        const reply = await getTasksCountFromApi();
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      } catch (e) {
        const err = e as AxiosError<any>;
        const msg =
          err.response?.data?.message ??
          err.response?.data?.error ??
          err.message ??
          "حصل خطأ في جلب بيانات التاسكات.";
        setMessages((prev) => [...prev, { role: "assistant", content: msg }]);
      } finally {
        setLoading(false);
      }
      return;
    }

    // ✅ غير كده رد محلي
    const botReply = getReplyLocal(text);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: botReply }]);
    }, 250);
  };

  return (
    <>
      {/* زرار فتح الشات */}
      <Button
        onClick={() => setOpen((v) => !v)}
        className="rounded-circle shadow primarycolorbg2"
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

      {open && (
        <div
          className="bg-white shadow rounded-4"
          style={{
            position: "fixed",
            bottom: 86,
            right: 18,
            width: 560,
            maxWidth: "calc(100vw - 36px)",
            height: 680,
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

          <div className="p-3" style={{ height: 460, overflowY: "auto", background: "#fafafa" }}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`d-flex mb-2 ${m.role === "user" ? "justify-content-end" : ""}`}
              >
                <div
                  className="px-3 py-2 rounded-4"
                  style={{
                    maxWidth: "100%",
                    whiteSpace: "pre-line",
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

          <div className="p-2 border-top">
            <div className="d-flex gap-2 align-items-center">
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

              <Button className="primarycolorbg2" onClick={send} disabled={loading}>
                {loading ? <Spinner size="sm" /> : <i className="bi bi-send" />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
