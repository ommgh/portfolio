"use client";
import type { HTMLAttributes } from "react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { setIntervalOnVisible } from "@/utils/visibility";

import data from "./explosion-data.json";

interface SubtleExplosionProps extends HTMLAttributes<HTMLDivElement> {
  interval?: number;
  delay?: number;
  opacity?: number;
}

export function SubtleExplosion({
  interval = 80,
  delay = 30,
  opacity = 1,
  className,
  ...attrs
}: SubtleExplosionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = -delay;

    const animate = () => {
      index++;
      if (index >= data.length) index = -delay;
      if (index < 0) return;

      if (ref.current) {
        ref.current.innerHTML = data[index];
      }
    };

    const cleanup = setIntervalOnVisible({
      element: wrapperRef.current,
      callback: animate,
      interval,
    });

    return () => cleanup?.();
  }, [interval, delay]);

  return (
    <div
      ref={wrapperRef}
      {...attrs}
      className={cn(
        "pointer-events-none absolute inset-0 select-none",
        className
      )}
    >
      <div
        ref={ref}
        className="fc-decoration absolute inset-0 flex items-center justify-center font-mono text-[#FA5D19]"
        dangerouslySetInnerHTML={{ __html: data[0] }}
        style={{
          whiteSpace: "pre",
          fontSize: "10px",
          lineHeight: "12.5px",
          opacity,
        }}
      />
    </div>
  );
}
