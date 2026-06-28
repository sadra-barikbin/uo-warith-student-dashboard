import { NextResponse } from "next/server";
import { academicStanding, rankInfo, student } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ student, academicStanding, rankInfo });
}
