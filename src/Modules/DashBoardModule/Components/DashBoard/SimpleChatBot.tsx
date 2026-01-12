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
  const [dark, setDark] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content: "أهلًا 👋 اسأليني مثلًا: (عدد التاسكات) أو (tasks count) أو (help).",
    },
  ]);

  // ✅ load/save dark mode
  useEffect(() => {
    const saved = localStorage.getItem("chat_dark");
    if (saved) setDark(saved === "1");
  }, []);

  useEffect(() => {
    localStorage.setItem("chat_dark", dark ? "1" : "0");
  }, [dark]);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const theme = dark
    ? {
        panel: "#0B1220",
        header: "#0B1220",
        body: "#0F172A",
        border: "rgba(255,255,255,0.10)",
        userBubble: "#F4A21B",
        botBubble: "#111827",
        botText: "#E5E7EB",
        userText: "#fff",
        inputBg: "#0B1220",
        inputText: "#E5E7EB",
        inputBorder: "rgba(255,255,255,0.14)",
      }
    : {
        panel: "#fff",
        header: "#fff",
        body: "#fafafa",
        border: "rgba(0,0,0,0.06)",
        userBubble: "#F4A21B",
        botBubble: "#fff",
        botText: "#111",
        userText: "#fff",
        inputBg: "#fff",
        inputText: "#111",
        inputBorder: "rgba(0,0,0,0.12)",
      };

  const replies = useMemo(
    () => [
      { keywords: ["ameera", "اميره", "أميره"], reply: "❤️ بحبك يا أميره" },
  { keywords: ["nadia", "ناديه", "نادية"], reply: "❤️😎 بحبك يا بشمهندسة نادية" },
  { keywords: ["amira", "أميرة"], reply: "❤️ يا أحلى أميرة" },
  { keywords: ["mohamed", "محمد"], reply: "👑 يا باشا محمد نورت" },
  { keywords: ["ahmed", "احمد", "أحمد"], reply: "🔥 يا أحمد يا جامد" },

  // ---- Company / Team ----
  { keywords: ["upskilling", "ابسكيلنج", "ابسكلنج", "up skill"], reply: "❤️✌️ Upskilling أحلى مكان وهيكبر ويبقى قد الدنيا" },
  { keywords: ["team", "فريق", "التيم"], reply: "🤝 التيم جامد… يلا نكسر الدنيا!" },

  // ---- Greetings ----
  { keywords: ["اهلا", "أهلا", "هلا", "hello", "hi", "hey", "welcome"], reply: "❤️ أهلا بيك يا حبيب قلبي" },
  { keywords: ["صباح", "morning"], reply: "☀️ صباح الفل والياسمين" },
  { keywords: ["مساء", "evening"], reply: "🌙 مساء الورد" },

  // ---- Love / Emo ----
  { keywords: ["بحبك", "love you", "حب"], reply: "💖 وأنا كمان والله!" },
  { keywords: ["قلب", "heart", "<3"], reply: "❤️❤️❤️" },
  { keywords: ["زعل", "sad", "مضايق"], reply: "😔 متزعلش… احكيلي بس" },
  { keywords: ["فرحان", "happy", "مبسوط"], reply: "🥳 جامد! مبروك يا بطل" },

  // ---- Compliments / Thanks ----
  { keywords: ["مجهود", "effort", "شغل", "جامد", "عاش"], reply: "تسلم يا كبير ❤️😎 ربنا يكرمك" },
  { keywords: ["شكرا", "شكرًا", "thanks", "thank", "اوكي", "ok", "تمام"], reply: "العفو 🙌" },

  // ---- Help / Navigation ----
  { keywords: ["help", "مساعدة", "ساعد", "ازاي", "كيفية", "how", "ايه ده"], reply: "قولي عايز/ة إيه: tasks / projects / users / dashboard / login" },
  { keywords: ["dashboard", "داشبورد"], reply: "📊 الداشبورد بيعرض الإحصائيات والـ charts ومؤشرات الأداء." },

  // ---- Tasks ----
  { keywords: ["task", "tasks", "تاسك", "تاسكات", "مهام"], reply: "📌 المهام: من صفحة Tasks تقدري تضيفي Task جديدة من زر + وتتابعي حالتها." },
  { keywords: ["todo", "to do", "to-do", "تودو"], reply: "🟡 ToDo يعني لسه متعملتش." },
  { keywords: ["inprogress", "in progress", "قيد التنفيذ"], reply: "🔵 In Progress يعني شغالين عليها دلوقتي." },
  { keywords: ["done", "تم", "خلصت"], reply: "🟢 Done يعني المهمة اتقفلت ✅" },

  // ---- Projects ----
  { keywords: ["project", "projects", "مشروع", "مشاريع"], reply: "📁 المشاريع: من صفحة Projects تقدري تضيفي مشروع جديد وتربطيه بالمهام." },
  { keywords: ["add project", "اضافة مشروع", "إضافة مشروع"], reply: "➕ لإضافة مشروع: افتحي Projects > Add New Project واملَي العنوان والوصف." },
  { keywords: ["edit project", "تعديل مشروع"], reply: "✏️ للتعديل: افتحي قائمة الـ 3 نقط > Edit." },
  { keywords: ["delete project", "حذف مشروع"], reply: "🗑️ للحذف: 3 نقط > Delete وتأكيد الحذف." },

  // ---- Users ----
  { keywords: ["user", "users", "مستخدم", "مستخدمين"], reply: "👥 المستخدمين: تقدري تشوفي Active/Inactive من صفحة Users." },
  { keywords: ["active", "نشط"], reply: "✅ Active يعني المستخدم شغال على السيستم." },
  { keywords: ["inactive", "غير نشط"], reply: "⛔ Inactive يعني المستخدم متوقف أو مش مفعل." },

  // ---- Auth / Errors ----
  { keywords: ["login", "تسجيل", "دخول", "auth", "token"], reply: "🔐 لو في مشكلة Login: اتأكدي من token في localStorage وإن الـ API بيرجع 200 مش 401." },
  { keywords: ["401", "unauthorized"], reply: "🚫 401: غالبًا token غلط/منتهي أو مش بيتبعت في Authorization header." },
  { keywords: ["403", "forbidden"], reply: "🚫 403: انتِ authenticated بس مش عندك صلاحية." },
  { keywords: ["404", "not found"], reply: "🔎 404: endpoint غلط أو resource مش موجود." },
  { keywords: ["500", "server error"], reply: "💥 500: مشكلة من السيرفر… جربي تشوفي logs أو جرّبي تاني." },

  // ---- Git ----
  { keywords: ["git", "جيت"], reply: "🐙 قولي عايزة pull ولا merge ولا stash؟" },
  { keywords: ["stash", "ستاش"], reply: "📦 git stash = يحفظ شغلك مؤقتًا… وبعدها git stash pop يرجعه." },
  { keywords: ["pull", "بول"], reply: "⬇️ git pull origin dev (أو main) عشان تنزلي آخر تحديث." },
  { keywords: ["merge", "ميرج"], reply: "🔀 git merge origin/dev عشان تدمجي تحديثات dev على برانشك." },
  { keywords: ["conflict", "كونفليكت", "تعارض"], reply: "⚠️ لو حصل conflict: صلّحي الملفات، git add . ثم git commit." },

  // ---- UI / Bootstrap ----
  { keywords: ["bootstrap", "بوتستراب"], reply: "🧩 Bootstrap: استخدمي classes زي d-flex, justify-content-between, rounded-4." },
  { keywords: ["dark mode", "دارك مود"], reply: "🌙 للدارك مود: ممكن data-bs-theme='dark' على الـ body أو root." },
  { keywords: ["spinner", "لودينج", "loading"], reply: "⏳ حطي Spinner وقت ما البيانات بتتحمّل عشان تجربة المستخدم تبقى أحسن." },

  // ---- Fun ----
  { keywords: ["ضحك", "lol", "😂", "هههه"], reply: "😂😂 ضحكتيني والله" },
  { keywords: ["سلام", "bye", "باي"], reply: "👋 باي يا جميل.. أشوفك قريب" },
    ],
    []
  );

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
      if (item.keywords.some((k) => t.includes(normalize(k)))) return item.reply;
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
          className="shadow rounded-4"
          style={{
            position: "fixed",
            bottom: 86,
            right: 18,
            width: 560,
            maxWidth: "calc(100vw - 36px)",
            height: 530,
            zIndex: 9999,
            overflow: "hidden",
            background: theme.panel,
            border: `1px solid ${theme.border}`,
          }}
        >
          {/* Header */}
          <div
            className="d-flex align-items-center justify-content-between p-3"
            style={{ background: theme.header, borderBottom: `1px solid ${theme.border}` }}
          >
            <div className="fw-semibold" style={{ color: dark ? "#E5E7EB" : "#111" }}>
              Simple Bot
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-light"
                onClick={() => setDark((v) => !v)}
                title="Toggle theme"
              >
                {dark ? "☀️" : "🌙"}
              </button>

              <button className="btn btn-sm btn-light" onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-3" style={{ height: 300, overflowY: "auto", background: theme.body }}>
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
                    background: m.role === "user" ? theme.userBubble : theme.botBubble,
                    color: m.role === "user" ? theme.userText : theme.botText,
                    border: m.role === "user" ? "none" : `1px solid ${theme.border}`,
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Footer */}
          <div className="p-2" style={{ borderTop: `1px solid ${theme.border}` }}>
            <div className="d-flex gap-2 align-items-center">
              <Form.Control
                value={input}
                placeholder="اكتبي رسالتك…"
                style={{
                  background: theme.inputBg,
                  color: theme.inputText,
                  border: `1px solid ${theme.inputBorder}`,
                }}
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

