import { motion } from "framer-motion";
import { PositionedItem, CX, CY, NODE, elbowPath } from "./Layout";

type Props = {
  leftItems: PositionedItem[];
  rightItems: PositionedItem[];
};

const STEP = 0.09; // seconds between each line joining the sweep
const GREEN ="#6f9736";
const GRAY = "#d6dce5";

export function ConnectorNetwork({ leftItems, rightItems }: Props) {
  return (
    <>
      {/* left side: starts deep GREEN, the sweep leaves it gray behind */}
      {leftItems.map((item, i) => {
        const delay = i * STEP;
        return (
          <motion.path
            key={`left-${i}`}
            d={elbowPath(item.x + 100, item.y, CX - NODE / 2, CY, 50)}
            fill="none"
            strokeWidth={2}
            initial={{ stroke: GREEN }}
            whileInView={{ stroke: GRAY }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay, ease: "easeInOut" }}
          />
        );
      })}

      {/* a short segment through the node itself, so the sweep visibly
          "passes through the middle" between the left and right groups */}
      <motion.line
        x1={CX - NODE / 2}
        y1={CY}
        x2={CX + NODE / 2}
        y2={CY}
        strokeWidth={2.5}
        initial={{ stroke: GRAY, opacity: 0.4 }}
        whileInView={{ stroke: GREEN, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.3, delay: leftItems.length * STEP, ease: "easeInOut" }}
      />

      {/* right side: draws itself in, trailing the sweep as it arrives */}
      {rightItems.map((item, i) => {
        const delay = (leftItems.length + 1 + i) * STEP;
        return (
          <motion.path
            key={`right-${i}`}
            d={elbowPath(CX + NODE / 2, CY, item.x - 8, item.y, 50)}
            fill="none"
            stroke={GREEN}
            strokeWidth={2.5}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
          />
        );
      })}
    </>
  );
}
