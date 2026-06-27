import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { StatCards } from "@/components/StatCards";
import { TranscriptTable } from "@/components/TranscriptTable";
import { CoursesCard } from "@/components/CoursesCard";

export default function RecordsPage() {
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
        <Topbar title="السجل الأكاديمي" dateLine="الجمعة، 27 حزيران · الفصل الثاني 2026" unread={0} />
        <StatCards />
        <TranscriptTable />
        <CoursesCard />
      </main>
    </div>
  );
}
