"use client";

import { useTheme } from "./ThemeProvider";
import { useSidebar } from "./SidebarProvider";
import { student } from "@/lib/data";
import { SunIcon, MoonIcon, BellIcon, MenuIcon } from "./icons";

const controlStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 10,
  border: "1px solid var(--bd-3)",
  background: "var(--ov)",
  color: "var(--muted-s)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

export function Topbar({ title, dateLine, unread }: { title: string; dateLine: string; unread: number }) {
  const { theme, toggleTheme } = useTheme();
  const { toggle: toggleSidebar } = useSidebar();

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          data-menu-btn
          onClick={toggleSidebar}
          title="القائمة"
          style={{ ...controlStyle, display: undefined, border: "1px solid var(--bd-3)" }}
        >
          <MenuIcon />
        </button>
        <div>
          <div style={{ fontWeight: 700, fontSize: 22 }}>{title}</div>
          <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{dateLine}</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={toggleTheme} title="تبديل المظهر" style={{ ...controlStyle, border: "1px solid var(--bd-3)" }}>
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>

        <button style={{ ...controlStyle, position: "relative" }} title="الإشعارات">
          <BellIcon />
          {unread > 0 && (
            <span
              style={{
                position: "absolute",
                top: -5,
                insetInlineStart: -5,
                minWidth: 18,
                height: 18,
                padding: "0 4px",
                borderRadius: 9,
                background: "var(--accent)",
                color: "var(--on-accent)",
                fontSize: 11,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid var(--bg)",
              }}
            >
              {unread}
            </span>
          )}
        </button>

        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: "linear-gradient(145deg,var(--av-1),var(--av-2))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: 13,
            color: "var(--on-tint)",
          }}
        >
          {student.initials}
        </div>
      </div>
    </header>
  );
}
