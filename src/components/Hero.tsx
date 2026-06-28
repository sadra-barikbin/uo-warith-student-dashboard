"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { StatCards, type StudentData } from "./StatCards";
import { Skeleton } from "./Skeleton";

export function Hero() {
  const { data } = useSWR<StudentData>("/api/student", fetcher);

  return (
    <section data-hero style={{ display: "flex", gap: 20, alignItems: "stretch" }}>
      <div
        style={{
          flex: 1,
          minWidth: 240,
          borderRadius: 18,
          border: "1px solid var(--bd)",
          boxShadow: "var(--card-shadow)",
          background: "linear-gradient(225deg, var(--accent-12), var(--hero-ov) 55%)",
          padding: 24,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: data ? 0 : 10,
        }}
      >
        {!data ? (
          <>
            <Skeleton style={{ width: "40%", height: 13 }} />
            <Skeleton style={{ width: "80%", height: 25 }} />
            <Skeleton style={{ width: "95%", height: 13 }} />
            <Skeleton style={{ width: "70%", height: 13 }} />
          </>
        ) : (
          <>
            <div style={{ fontSize: 13, color: "var(--accent)", fontWeight: 600 }}>
              صباح الخير، {data.student.firstName}
            </div>
            <div
              style={{
                fontSize: 25,
                fontWeight: 700,
                lineHeight: 1.4,
                margin: "10px 0 8px",
              }}
            >
              ترتيبكِ <span style={{ color: "var(--accent)" }}>السابع</span> من {data.rankInfo.cohortSize} هذا
              الفصل.
            </div>
            <div style={{ fontSize: 13.5, color: "var(--muted-s)", lineHeight: 1.7 }}>
              أنتِ ضمن الأعلى 5% من دفعتكِ، ومعدلكِ ارتفع بمقدار أربعة أجزاء من مئة منذ الفصل الماضي. زخمٌ قويّ مع
              اقتراب الامتحانات النهائية.
            </div>
          </>
        )}
      </div>

      <div style={{ flex: 1.35 }}>
        <StatCards />
      </div>
    </section>
  );
}
