export type GradeBand = "pos" | "info" | "warn" | "neg";

export function gradeBand(grade: string): GradeBand {
  const c = grade[0];
  if (c === "A") return "pos";
  if (c === "B") return "info";
  if (c === "C") return "warn";
  return "neg";
}

export interface Course {
  code: string;
  name: string;
  instr: string;
  credits: number;
  grade: string;
  pct: number;
}

export const student = {
  initials: "ز ح",
  name: "زينب الحسيني",
  major: "بكالوريوس علوم الحاسوب",
  firstName: "زينب",
};

export const gpaSeries = [
  { term: "خ23", gpa: 3.4 },
  { term: "ر24", gpa: 3.55 },
  { term: "خ24", gpa: 3.62 },
  { term: "ر25", gpa: 3.7 },
  { term: "خ25", gpa: 3.74 },
  { term: "ر26", gpa: 3.78 },
];

export const coursesCurrent: Course[] = [
  { code: "CS 340", name: "تصميم وتحليل الخوارزميات", instr: "د. رياض العكيلي", credits: 4, grade: "A−", pct: 92 },
  { code: "CS 361", name: "هندسة البرمجيات", instr: "د. ليلى وهبي", credits: 3, grade: "B+", pct: 88 },
  { code: "MATH 314", name: "الجبر الخطّي", instr: "د. باسم النائب", credits: 3, grade: "A", pct: 95 },
  { code: "CS 312", name: "شبكات الحاسوب", instr: "د. حسن القصير", credits: 4, grade: "B+", pct: 87 },
  { code: "ENG 210", name: "الكتابة التقنية", instr: "أ. مريم العبيدي", credits: 3, grade: "A−", pct: 91 },
];

export const coursesPast: Course[] = [
  { code: "CS 331", name: "نظم التشغيل", instr: "د. سامي العامري", credits: 4, grade: "A", pct: 97 },
  { code: "CS 350", name: "نظم قواعد البيانات", instr: "د. رياض العكيلي", credits: 3, grade: "A−", pct: 93 },
  { code: "MATH 250", name: "الاحتمالات والإحصاء", instr: "د. إيمان لطيف", credits: 4, grade: "B+", pct: 89 },
  { code: "CS 290", name: "معمارية أنظمة الويب", instr: "د. ليلى وهبي", credits: 3, grade: "A−", pct: 92 },
  { code: "PHIL 180", name: "المنطق والاستدلال", instr: "أ. داود مبارك", credits: 3, grade: "A", pct: 96 },
];

export const termMeta = {
  current: { gpa: "3.84", sub: "قيد الدراسة · الأسبوع 9 من 15", credits: "17 وحدة" },
  past: { gpa: "3.91", sub: "مكتمل · الدرجات النهائية", credits: "17 وحدة" },
};

export const gradeDistribution = [
  { label: "A", count: 9 },
  { label: "A−", count: 17, you: true },
  { label: "B+", count: 24 },
  { label: "B", count: 29 },
  { label: "B−", count: 26 },
  { label: "C+", count: 19 },
  { label: "C", count: 11 },
  { label: "C−", count: 5 },
  { label: "D", count: 2 },
];

export interface Announcement {
  id: string;
  tag: string;
  title: string;
  time: string;
  key: "pos" | "warn" | "accent" | "alt";
}

export const announcements: Announcement[] = [
  { id: "a1", tag: "الدرجات", title: "تم نشر درجات الامتحان الثاني لمقرر CS 340", time: "قبل ساعتين", key: "pos" },
  { id: "a2", tag: "موعد نهائي", title: "تسليم مقترح مشروع هندسة البرمجيات الخميس الساعة 5 مساءً", time: "قبل 5 ساعات", key: "warn" },
  { id: "a3", tag: "الإرشاد", title: "يبدأ التسجيل للفصل الأول 2026 في 14 أيلول", time: "أمس", key: "accent" },
  { id: "a4", tag: "فعالية", title: "محاضرة ACM: الأنظمة الموزَّعة على نطاق واسع — الخميس 6 مساءً", time: "قبل يومين", key: "alt" },
];

export interface ScheduleItem {
  t: string;
  c: string;
  r: string;
  col: "pos" | "info" | "warn" | "alt";
}

export interface ScheduleDay {
  day: string;
  items: ScheduleItem[];
}

export const schedule: ScheduleDay[] = [
  { day: "الأحد", items: [
    { t: "09:00", c: "CS 340", r: "قاعة A2", col: "pos" },
    { t: "13:00", c: "MATH 314", r: "علوم 110", col: "alt" },
  ] },
  { day: "الاثنين", items: [
    { t: "10:30", c: "CS 361", r: "مختبر 3", col: "info" },
    { t: "14:00", c: "CS 312", r: "قاعة B1", col: "pos" },
  ] },
  { day: "الثلاثاء", items: [
    { t: "09:00", c: "CS 340", r: "قاعة A2", col: "pos" },
    { t: "11:00", c: "ENG 210", r: "آداب 4", col: "warn" },
  ] },
  { day: "الأربعاء", items: [
    { t: "10:30", c: "CS 361", r: "مختبر 3", col: "info" },
    { t: "14:00", c: "CS 312", r: "قاعة B1", col: "pos" },
    { t: "15:30", c: "مختبر رياضيات", r: "علوم 110", col: "alt" },
  ] },
  { day: "الخميس", items: [
    { t: "09:00", c: "مختبر CS 340", r: "مختبر 1", col: "pos" },
    { t: "11:00", c: "ENG 210", r: "آداب 4", col: "warn" },
  ] },
];

export const rankInfo = {
  rank: 7,
  cohortSize: 142,
  percentile: 95, // top 5%
  cohortAvgGpa: 3.21,
  studentGpa: 3.78,
};

export const academicStanding = {
  cumulativeGpa: 3.78,
  prevGpa: 3.74,
  delta: 0.04,
  creditsEarned: 84,
  creditsTotal: 120,
  status: "قائمة العميد",
  statusSub: "3 فصول متتالية · وضع جيّد",
};
