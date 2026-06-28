"use client";

import useSWR from "swr";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { Hero } from "@/components/Hero";
import { AIAdvisorCard } from "@/components/AIAdvisorCard";
import { AnnouncementsCard } from "@/components/AnnouncementsCard";
import { fetcher } from "@/lib/fetcher";
import type { Announcement } from "@/lib/data";

interface AnnouncementsData {
  announcements: (Announcement & { unread: boolean })[];
  unread: number;
}

export default function OverviewPage() {
  const { data, mutate } = useSWR<AnnouncementsData>("/api/announcements", fetcher);

  const markRead = async (id: string) => {
    const res = await fetch(`/api/announcements/${id}/read`, { method: "POST" });
    if (!res.ok) return;
    const updated: AnnouncementsData = await res.json();
    mutate(updated);
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

        {data && <AnnouncementsCard announcements={data.announcements} onMarkRead={markRead} />}
      </main>
    </div>
  );
}
