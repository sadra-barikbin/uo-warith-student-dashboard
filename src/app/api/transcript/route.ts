import { NextResponse } from "next/server";
import { transcript } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ transcript });
}
