"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { student } from "@/lib/data";
import { GridIcon, ChartIcon, BookIcon, CalendarIcon, AwardIcon, DocumentIcon } from "./icons";
import { useSidebar } from "./SidebarProvider";

const NAV_ITEMS = [
  { key: "overview", href: "/", label: "نظرة عامة", Icon: GridIcon },
  { key: "performance", href: "/performance", label: "الأداء", Icon: ChartIcon },
  { key: "courses", href: "/courses", label: "المقررات", Icon: BookIcon },
  { key: "schedule", href: "/schedule", label: "الجدول", Icon: CalendarIcon },
  { key: "grades", href: "/grades", label: "الدرجات", Icon: AwardIcon },
  { key: "records", href: "/records", label: "السجل الأكاديمي", Icon: DocumentIcon },
];

export function Sidebar() {
  const pathname = usePathname();
  const { open, close } = useSidebar();

  return (
    <>
      <div
        data-sidebar-backdrop
        onClick={close}
        style={{ display: open ? "block" : "none" }}
      />
      <aside
        data-sidebar
        data-open={open}
        style={{
          width: 256,
          flexShrink: 0,
          borderLeft: "1px solid var(--bd)",
          padding: "24px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 28,
          position: "sticky",
          top: 0,
          height: "100vh",
          background: "var(--sidebar-bg)",
        }}
      >
      <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
        <div
          style={{
            width: 34,
            height: 52,
            flexShrink: 0,
            background: "var(--logo) center/contain no-repeat",
          }}
        />
        <div style={{ lineHeight: 1.3 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>وارث الأنبياء</div>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>جامعة · كربلاء</div>
        </div>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div
          style={{
            fontSize: 10.5,
            letterSpacing: 0.5,
            color: "var(--faint)",
            fontWeight: 600,
            padding: "0 12px 8px",
          }}
        >
          القائمة
        </div>
        {NAV_ITEMS.map(({ key, href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={key}
              href={href}
              onClick={close}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
                padding: "10px 12px",
                borderRadius: 10,
                fontFamily: "var(--font-plex-arabic), sans-serif",
                fontWeight: 500,
                fontSize: 13.5,
                textAlign: "start",
                background: active ? "var(--accent-12)" : "transparent",
                color: active ? "var(--text-strong)" : "var(--muted)",
                transition: "background .15s, color .15s",
                textDecoration: "none",
              }}
            >
              <Icon />
              {label}
            </Link>
          );
        })}
      </nav>

      <div
        style={{
          marginTop: "auto",
          display: "flex",
          alignItems: "center",
          gap: 11,
          padding: 11,
          borderRadius: 12,
          border: "1px solid var(--bd)",
          background: "var(--ov)",
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: "linear-gradient(145deg,var(--av-1),var(--av-2))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: 14,
            color: "var(--on-tint)",
          }}
        >
          {student.initials}
        </div>
        <div style={{ minWidth: 0, lineHeight: 1.3 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {student.name}
          </div>
          <div
            style={{
              fontSize: 11,
              color: "var(--muted)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {student.major}
          </div>
        </div>
      </div>
      </aside>
    </>
  );
}
