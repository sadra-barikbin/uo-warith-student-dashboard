import { NextResponse } from "next/server";
import { announcements } from "@/lib/data";
import { isRead } from "@/lib/store";

export async function GET() {
  const items = announcements.map((a) => ({ ...a, unread: !isRead(a.id) }));
  const unread = items.filter((a) => a.unread).length;
  return NextResponse.json({ announcements: items, unread });
}
