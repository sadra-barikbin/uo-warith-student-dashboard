import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function PlaceholderPage({ title, dateLine }: { title: string; dateLine: string }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main
        data-main
        style={{
          flex: 1,
          minWidth: 0,
          padding: "26px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 22,
          animation: "dashIn .4s ease both",
        }}
      >
        <Topbar title={title} dateLine={dateLine} unread={0} />
        <section
          style={{
            borderRadius: 18,
            border: "1px solid var(--bd)",
            boxShadow: "var(--card-shadow)",
            background: "var(--surface)",
            padding: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            flex: 1,
            minHeight: 320,
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 18 }}>هذا القسم قيد التطوير</div>
          <div style={{ fontSize: 13.5, color: "var(--muted)" }}>سيتم إضافة محتوى {title} قريباً.</div>
        </section>
      </main>
    </div>
  );
}
