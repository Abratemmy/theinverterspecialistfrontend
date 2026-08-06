import { DiagramItem } from "./data";

// SVG coordinate space the whole diagram is drawn in
export const W = 900;
export const H = 260; // was 420 — shorter overall diagram
export const CX = 450;
export const CY = H / 2;
export const NODE = 48; // center square size

export type PositionedItem = DiagramItem & { x: number; y: number };

/** Spreads items evenly down the left side, all at the same x. */
export function layoutLeft(items: DiagramItem[]): PositionedItem[] {
  const step = H / (items.length + 1);
  return items.map((item, i) => ({ ...item, x: 40, y: step * (i + 1) }));
}

/** Spreads items down the right side with a slight zig-zag on x,
 *  echoing the reference design where some pills sit further out. */
export function layoutRight(items: DiagramItem[]): PositionedItem[] {
  const step = H / (items.length + 1);
  return items.map((item, i) => ({
    ...item,
    x: 560 + (i % 3) * 70,
    y: step * (i + 1),
  }));
}

/** Rounded elbow: horizontal out of the start point, a corner, then
 *  horizontal into the end point. `trunk` controls how far it travels
 *  before bending. */
export function elbowPath(x1: number, y1: number, x2: number, y2: number, trunk = 50) {
  const r = 12;
  if (Math.abs(y2 - y1) < 1) return `M ${x1} ${y1} L ${x2} ${y2}`;

  const dir = x2 > x1 ? 1 : -1;
  const bendX = x1 + trunk * dir;
  const vDir = y2 > y1 ? 1 : -1;

  return `
    M ${x1} ${y1}
    L ${bendX - r * dir} ${y1}
    Q ${bendX} ${y1} ${bendX} ${y1 + r * vDir}
    L ${bendX} ${y2 - r * vDir}
    Q ${bendX} ${y2} ${bendX + r * dir} ${y2}
    L ${x2} ${y2}
  `.trim();
}