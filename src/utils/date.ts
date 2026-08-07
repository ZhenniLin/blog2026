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
