"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { Hero } from "@/components/Hero";
import { AIAdvisorCard } from "@/components/AIAdvisorCard";
import { GpaTrendChart } from "@/components/GpaTrendChart";
import { PercentileGauge } from "@/components/PercentileGauge";
import { CoursesCard } from "@/components/CoursesCard";
import { GradeDistributionCard } from "@/components/GradeDistributionCard";
import { WeeklySchedule } from "@/components/WeeklySchedule";
import { AnnouncementsCard } from "@/components/AnnouncementsCard";
import { announcements } from "@/lib/data";

export default function OverviewPage() {
  const [readIds, setReadIds] = useState<string[]>([]);
  const unread = announcements.filter((a) => !readIds.includes(a.id)).length;

  const markRead = (id: string) => {
    setReadIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

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
        <Topbar title="نظرة عامة" dateLine="الجمعة، 27 حزيران · الفصل الثاني 2026" unread={unread} />
        <Hero />
        <AIAdvisorCard />

        <section data-grid style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,1fr)", gap: 20 }}>
          <GpaTrendChart />
          <PercentileGauge />
        </section>

        <section data-grid style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,1fr)", gap: 20 }}>
          <CoursesCard />
          <GradeDistributionCard />
        </section>

        <WeeklySchedule />

        <AnnouncementsCard announcements={announcements} readIds={readIds} onMarkRead={markRead} />
      </main>
    </div>
  );
}
