import { KeyRound } from "lucide-react";
import { CX, CY, NODE } from "./Layout";

export function CenterNode() {
  return (
    <g>
      <rect
        x={CX - NODE / 2}
        y={CY - NODE / 2}
        width={NODE}
        height={NODE}
        rx={16}
        fill="url(#wcu-node-gradient)"
      />
      <foreignObject x={CX - 12} y={CY - 12} width={24} height={24}>
        <KeyRound className="h-6 w-6 text-white" strokeWidth={2} />
      </foreignObject>
    </g>
  );
}
