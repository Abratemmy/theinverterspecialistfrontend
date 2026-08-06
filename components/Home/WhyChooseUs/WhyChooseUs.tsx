"use client";

import { PROBLEMS, SOLUTIONS } from "./data";
import { W, H, layoutLeft, layoutRight } from "./Layout";
import { CenterNode } from "./CenterNode";
import { ConnectorNetwork } from "./ConnectorNetwork";
import { Pill } from "./Pill";
import { CompactList } from "./CompactList";
import Container from "@/components/common/Container/Container";
import { SectionHeader } from "@/components/common";

const RIGHT_STAGGER_STEP = 0.09;

export default function WhyChooseUs() {
  const leftItems = layoutLeft(PROBLEMS);
  const rightItems = layoutRight(SOLUTIONS);

  return (
    <section className=" py-8 bg-green-50">
        <Container>
      
            <SectionHeader
                title="Why Choose Ebton?"
                subtitle="Premium solar and power products carefully selected for you."
                href=""
                actionText=""
            />

            {/* diagram: md and up */}
            <div className="relative mx-auto hidden aspect-[900/260] w-full md:block">
                <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible">
                <defs>
                    <linearGradient id="wcu-node-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" />
                    <stop offset="100%" stopColor="var(--color-primary-dark)" />
                    </linearGradient>
                </defs>

                <ConnectorNetwork leftItems={leftItems} rightItems={rightItems} />
                <CenterNode />
                </svg>

                {leftItems.map((item, i) => (
                <Pill key={`left-pill-${i}`} item={item} variant="muted" />
                ))}

                {rightItems.map((item, i) => (
                <Pill
                    key={`right-pill-${i}`}
                    item={item}
                    variant="solid"
                    delay={(leftItems.length + 1 + i) * RIGHT_STAGGER_STEP + 0.1}
                />
                ))}
            </div>

            {/* fallback: below md */}
            <CompactList problems={PROBLEMS} solutions={SOLUTIONS} />
        </Container>
    </section>
  );
}
