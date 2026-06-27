"use client";

import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { student } from "@/lib/data";
import { SunIcon, MoonIcon, ChevronDownIcon, SearchIcon, BellIcon } from "./icons";

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

const TERMS = ["الفصل الثاني 2026", "الفصل الأول 2025"];

export function Topbar({ title, dateLine, unread }: { title: string; dateLine: string; unread: number }) {
  const { theme, toggleTheme } = useTheme();
  const [term, setTerm] = useState(TERMS[0]);
  const [termOpen, setTermOpen] = useState(false);

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
      <div>
        <div style={{ fontWeight: 700, fontSize: 22 }}>{title}</div>
        <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{dateLine}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={toggleTheme} title="تبديل المظهر" style={{ ...controlStyle, border: "1px solid var(--bd-3)" }}>
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => setTermOpen((o) => !o)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 14px",
              borderRadius: 10,
              border: "1px solid var(--bd-3)",
              background: "var(--ov)",
              fontSize: 13,
              color: "var(--muted-s)",
              cursor: "pointer",
              fontFamily: "var(--font-plex-arabic), sans-serif",
            }}
          >
            {term}
            <ChevronDownIcon />
          </button>
          {termOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                insetInlineEnd: 0,
                background: "var(--surface)",
                border: "1px solid var(--bd)",
                borderRadius: 10,
                boxShadow: "var(--card-shadow)",
                zIndex: 10,
                minWidth: 180,
                overflow: "hidden",
              }}
            >
              {TERMS.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTerm(t);
                    setTermOpen(false);
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "start",
                    padding: "10px 14px",
                    fontSize: 13,
                    background: t === term ? "var(--accent-12)" : "transparent",
                    color: t === term ? "var(--text-strong)" : "var(--muted-s)",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-plex-arabic), sans-serif",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        <button style={controlStyle} title="بحث">
          <SearchIcon />
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
