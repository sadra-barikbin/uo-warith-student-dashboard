import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { WeeklySchedule } from "@/components/WeeklySchedule";

export default function SchedulePage() {
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
        <Topbar title="الجدول" dateLine="الجمعة، 27 حزيران · الفصل الثاني 2026" unread={0} />
        <WeeklySchedule />
      </main>
    </div>
  );
}
