export type DiagramItem = {
  label: string;
};

// left branch — pain points, stays muted/gray
export const PROBLEMS: DiagramItem[] = [
  { label: "Black Out" },
  { label: "Stress" },
  { label: "NEPA problem" },
  { label: "Black Outs" },
  { label: "High Electricity bBlls" },
];

// right branch — benefits, lights up blue on scroll
export const SOLUTIONS: DiagramItem[] = [
  { label: "Reliable power" },
  { label: "Lower Energy Cost" },
  { label: "Solar tips" },
  { label: "Premium Products" },
  { label: "24/7 support" },
  { label: "Peace of mind" },
];