import { motion } from "framer-motion";
import { PositionedItem, W, H } from "./Layout";

type Props = {
  item: PositionedItem;
  variant: "muted" | "solid";
  delay?: number;
};

export function Pill({ item, variant, delay = 0 }: Props) {
  const style = {
    left: `${(item.x / W) * 100}%`,
    top: `${(item.y / H) * 100}%`,
  };

  if (variant === "muted") {
    return (
      <div
        className="absolute -translate-y-1/2 whitespace-nowrap rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium leading-tight text-slate-400 sm:px-3.5 sm:py-1.5 sm:text-xs"
        style={style}
      >
        {item.label}
      </div>
    );
  }

  return (
    <motion.div
      className="absolute -translate-y-1/2 whitespace-nowrap rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] px-3 py-1 text-[11px] font-medium leading-tight text-white sm:px-3.5 sm:py-1.5 sm:text-xs"
      style={style}
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {item.label}
    </motion.div>
  );
}
