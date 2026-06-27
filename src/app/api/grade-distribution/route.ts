import { NextResponse } from "next/server";
import { gradeDistribution } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ distribution: gradeDistribution });
}
