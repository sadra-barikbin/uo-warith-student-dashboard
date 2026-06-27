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
import { useApi } from "@/lib/useApi";
import type { Announcement } from "@/lib/data";

interface AnnouncementsData {
  announcements: (Announcement & { unread: boolean })[];
  unread: number;
}

export default function OverviewPage() {
  const { data, setData } = useAnnouncements();

  const markRead = async (id: string) => {
    const res = await fetch(`/api/announcements/${id}/read`, { method: "POST" });
    if (!res.ok) return;
    const updated: AnnouncementsData = await res.json();
    setData(updated);
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
        <Topbar title="نظرة عامة" dateLine="الجمعة، 27 حزيران · الفصل الثاني 2026" unread={data?.unread ?? 0} />
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

        {data && <AnnouncementsCard announcements={data.announcements} onMarkRead={markRead} />}
      </main>
    </div>
  );
}

function useAnnouncements() {
  const { data: fetched } = useApi<AnnouncementsData>("/api/announcements");
  const [override, setOverride] = useState<AnnouncementsData | null>(null);
  return { data: override ?? fetched, setData: setOverride };
}
