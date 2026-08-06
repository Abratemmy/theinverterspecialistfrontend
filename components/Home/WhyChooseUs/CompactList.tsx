"use client";

import { motion } from "framer-motion";
import { KeyRound } from "lucide-react";
import { DiagramItem } from "./data";

type Props = {
  problems: DiagramItem[];
  solutions: DiagramItem[];
};

/** Narrow-screen fallback: the branching diagram doesn't fit below
 *  ~768px, so phones get two simple stacked groups instead. */
export function CompactList({ problems, solutions }: Props) {
  return (
    <div className="flex flex-col items-center gap-6 md:hidden">
      <div className="flex flex-wrap justify-center gap-1">
        {problems.map((item, i) => (
          <span
            key={`m-left-${i}`}
            className="whitespace-nowrap rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-400"
          >
            {item.label}
          </span>
        ))}
      </div>

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#6f9736] to-[#0d612a]">
        <KeyRound className="h-5 w-5 text-white" strokeWidth={2} />
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {solutions.map((item, i) => (
          <motion.span
            key={`m-right-${i}`}
            className="whitespace-nowrap rounded-full bg-gradient-to-br from-[#6f9736] to-[#0d612a] px-3 py-1 text-[11px] font-medium text-white"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
          >
            {item.label}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
