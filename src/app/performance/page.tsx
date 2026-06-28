import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { StatCards } from "@/components/StatCards";
import { GpaTrendChart } from "@/components/GpaTrendChart";
import { PercentileGauge } from "@/components/PercentileGauge";
import { GradeDistributionCard } from "@/components/GradeDistributionCard";

export default function PerformancePage() {
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
        <Topbar title="الأداء" dateLine="الجمعة، 27 حزيران · الفصل الثاني 2026" unread={0} />
        <StatCards />
        <section data-grid style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,1fr)", gap: 20 }}>
          <GpaTrendChart />
          <PercentileGauge />
        </section>
        <GradeDistributionCard />
      </main>
    </div>
  );
}
