import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { GradeDistributionCard } from "@/components/GradeDistributionCard";
import { TranscriptTable } from "@/components/TranscriptTable";

export default function GradesPage() {
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
        <Topbar title="الدرجات" dateLine="الجمعة، 27 حزيران · الفصل الثاني 2026" unread={0} />
        <section data-grid style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 20 }}>
          <GradeDistributionCard />
          <TranscriptTable />
        </section>
      </main>
    </div>
  );
}
