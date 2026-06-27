import { ArrowLeftIcon, BookIcon, SparkleIcon, StarIcon, UserIcon } from "./icons";

const chipStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
  padding: "12px 13px",
  borderRadius: 11,
  background: "var(--ov-3)",
  border: "1px solid var(--bd-2)",
};

const chipTextStyle: React.CSSProperties = {
  fontSize: 12.5,
  color: "var(--text-3)",
  lineHeight: 1.6,
};

export function AIAdvisorCard() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 18,
        border: "1px solid var(--accent-22)",
        boxShadow: "var(--card-shadow)",
        background: "linear-gradient(120deg, var(--accent-12), var(--surface-2) 45%, var(--surface))",
        padding: 24,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -70,
          insetInlineStart: -40,
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--accent-12), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
        <div
          style={{
            flexShrink: 0,
            width: 52,
            height: 52,
            borderRadius: 14,
            background: "linear-gradient(145deg,var(--accent),var(--accent2))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 24px var(--accent-shadow)",
            animation: "orbFloat 4s ease-in-out infinite",
          }}
        >
          <SparkleIcon stroke="var(--on-accent)" />
        </div>
        <div style={{ flex: 1, minWidth: 260 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ fontWeight: 700, fontSize: 18 }}>ذكاء الوارث</div>
            <div
              style={{
                fontSize: 11,
                color: "var(--accent)",
                background: "var(--accent-12)",
                border: "1px solid var(--accent-22)",
                padding: "3px 9px",
                borderRadius: 7,
                fontWeight: 600,
              }}
            >
              توصية جديدة
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>مساعد الجامعة الذكي</div>
          </div>
          <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.85, margin: "12px 0 0" }}>
            بناءً على سجلكِ الأكاديمي، معدلكِ التراكمي{" "}
            <span style={{ color: "var(--text-strong)", fontWeight: 600 }}>3.78</span> ويضعكِ ضمن الأعلى 5% من
            الدفعة. أضعف مقرراتك هذا الفصل هما{" "}
            <span style={{ color: "var(--text-strong)", fontWeight: 600 }}>شبكات الحاسوب (87%)</span> و
            <span style={{ color: "var(--text-strong)", fontWeight: 600 }}>هندسة البرمجيات (88%)</span>. رفعهما إلى
            مستوى A− قد يرفع معدل الفصل من 3.84 إلى نحو{" "}
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>3.93</span> ويحسّن ترتيبكِ من السابع إلى
            الرابع تقريباً.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 10,
              marginTop: 18,
            }}
          >
            <div style={chipStyle}>
              <BookIcon stroke="var(--accent)" style={{ flexShrink: 0, marginTop: 1 }} />
              <span style={chipTextStyle}>خصّصي 3 ساعات أسبوعياً لمراجعة شبكات الحاسوب قبل الامتحان النهائي.</span>
            </div>
            <div style={chipStyle}>
              <UserIcon stroke="var(--accent)" style={{ flexShrink: 0, marginTop: 1 }} />
              <span style={chipTextStyle}>احضري الساعات المكتبية للد. ليلى وهبي لمناقشة مقترح مشروع هندسة البرمجيات.</span>
            </div>
            <div style={chipStyle}>
              <StarIcon stroke="var(--pos)" style={{ flexShrink: 0, marginTop: 1 }} />
              <span style={chipTextStyle}>حافظي على تفوقك في الجبر الخطي (95%) لتثبيت معدل الفصل.</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 14,
              flexWrap: "wrap",
              marginTop: 18,
              paddingTop: 16,
              borderTop: "1px solid var(--bd)",
            }}
          >
            <div style={{ fontSize: 11.5, color: "var(--muted)" }}>
              تحليل مبني على أدائك في 11 مقرراً سابقاً و5 مقررات حالية
            </div>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 16px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                background: "var(--accent)",
                color: "var(--on-accent)",
                fontFamily: "var(--font-plex-arabic), sans-serif",
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              عرض الخطة الكاملة
              <ArrowLeftIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
