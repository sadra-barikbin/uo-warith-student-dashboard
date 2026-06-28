import { NextRequest, NextResponse } from "next/server";
import { coursesCurrent, coursesPast, termMeta } from "@/lib/data";

export async function GET(request: NextRequest) {
  const term = request.nextUrl.searchParams.get("term") === "past" ? "past" : "current";
  const courses = term === "current" ? coursesCurrent : coursesPast;
  return NextResponse.json({ term, courses, meta: termMeta[term] });
}
