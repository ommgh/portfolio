"use client";

import type { HTMLAttributes } from "react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { setIntervalOnVisible } from "@/utils/visibility";

import data from "./explosion-data.json";

export function AsciiExplosion(attrs: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = -30;

    const interval = setIntervalOnVisible({
      element: wrapperRef.current,
      callback: () => {
        index++;
        if (index >= data.length) index = -40;
        if (index < 0) return;

        ref.current!.innerHTML = data[index];
      },
      interval: 40,
    });

    return () => interval?.();
  }, []);

  return (
    <div
      ref={wrapperRef}
      {...attrs}
      className={cn(
        "pointer-events-none absolute flex h-[400px] w-[720px] gap-16 select-none",
        attrs.className
      )}
    >
      <div
        className="fc-decoration font-mono text-[#FA5D19]"
        dangerouslySetInnerHTML={{ __html: data[0] }}
        ref={ref}
        style={{
          whiteSpace: "pre",
          fontSize: "10px",
          lineHeight: "12.5px",
        }}
      />
    </div>
  );
}

// Default export for backward compatibility
export default AsciiExplosion;
