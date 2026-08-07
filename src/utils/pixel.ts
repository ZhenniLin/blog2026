/**
 * 把 ASCII 像素画转成 SVG 用的矩形。
 * 同一行里连续的同色格子会被合并成一个 <rect>，减少 DOM 节点。
 */
export interface Run {
  x: number;
  y: number;
  w: number;
  fill: string;
}

export function toRuns(rows: string[], palette: Record<string, string>): Run[] {
  const runs: Run[] = [];

  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const fill = palette[row[x]!];
      if (!fill) {
        x += 1;
        continue;
      }
      let w = 1;
      while (x + w < row.length && palette[row[x + w]!] === fill) w += 1;
      runs.push({ x, y, w, fill });
      x += w;
    }
  });

  return runs;
}
