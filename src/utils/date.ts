const pad = (n: number) => String(n).padStart(2, '0');

/** 2026-06 */
export const formatYM = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;

/** 2026-06-23 */
export const formatYMD = (date: Date) =>
  `${formatYM(date)}-${pad(date.getDate())}`;

/** 按时间倒序 */
export const byDateDesc = <T extends { data: { date: Date } }>(a: T, b: T) =>
  b.data.date.valueOf() - a.data.date.valueOf();

/** 文章优先按最近更新时间倒序，未填写时使用发布日期。 */
export const byUpdatedDesc = <T extends { id: string; data: { date: Date; updatedAt?: Date } }>(a: T, b: T) =>
  (b.data.updatedAt ?? b.data.date).valueOf() - (a.data.updatedAt ?? a.data.date).valueOf()
  || b.data.date.valueOf() - a.data.date.valueOf()
  || a.id.localeCompare(b.id);
