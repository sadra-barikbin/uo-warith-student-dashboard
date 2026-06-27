import { announcements } from "./data";

const readIds = new Set<string>();

export function getReadIds(): string[] {
  return Array.from(readIds);
}

export function isRead(id: string): boolean {
  return readIds.has(id);
}

export function markAnnouncementRead(id: string): boolean {
  if (!announcements.some((a) => a.id === id)) return false;
  readIds.add(id);
  return true;
}
