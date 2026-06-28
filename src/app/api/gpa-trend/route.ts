import { NextResponse } from "next/server";
import { gpaSeries } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ series: gpaSeries });
}
