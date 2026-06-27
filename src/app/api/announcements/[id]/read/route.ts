import { NextResponse } from "next/server";
import { announcements } from "@/lib/data";
import { isRead, markAnnouncementRead } from "@/lib/store";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ok = markAnnouncementRead(id);
  if (!ok) {
    return NextResponse.json({ error: "Announcement not found" }, { status: 404 });
  }
  const items = announcements.map((a) => ({ ...a, unread: !isRead(a.id) }));
  const unread = items.filter((a) => a.unread).length;
  return NextResponse.json({ announcements: items, unread });
}
