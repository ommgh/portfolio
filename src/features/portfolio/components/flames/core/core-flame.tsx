"use client";

import type { HTMLAttributes } from "react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { setIntervalOnVisible } from "@/utils/visibility";

import data from "./core-flame.json";

export function CoreFlame(attrs: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;

    const interval = setIntervalOnVisible({
      element: wrapperRef.current,
      callback: () => {
        index++;
        if (index >= data.length) index = 0;

        const newStr = data[index];

        if (ref.current) {
          ref.current.innerHTML = newStr;
        }
      },
      interval: 80,
    });

    return () => interval?.();
  }, []);

  return (
    <div
      ref={wrapperRef}
      {...attrs}
      className={cn(
        "pointer-events-none shrink-0 select-none",
        attrs.className
      )}
    >
      <div
        className="font-ascii text-[#FA5D19]"
        ref={ref}
        dangerouslySetInnerHTML={{ __html: data[0] }}
        style={{
          whiteSpace: "pre",
          fontSize: 12,
          lineHeight: "10px",
        }}
      />
    </div>
  );
}

// Export default for backward compatibility
export default CoreFlame;
