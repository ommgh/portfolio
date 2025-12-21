"use client";

import { useEffect, useRef } from "react";

import { setIntervalOnVisible } from "@/utils/visibility";

import data from "./hero-flame-data.json";

export default function HeroFlame() {
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;

    const interval = setIntervalOnVisible({
      element: wrapperRef.current,
      callback: () => {
        index++;
        if (index >= data.length) index = 0;

        if (ref.current) {
          ref.current.innerHTML = data[index];
        }

        if (ref2.current) {
          ref2.current.innerHTML = data[index];
        }
      },
      interval: 85,
    });

    return () => interval?.();
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-end justify-center overflow-hidden select-none"
      ref={wrapperRef}
    >
      <div className="flex h-[290px] w-full max-w-[786px] gap-4">
        <div className="relative flex-1">
          <div
            className="font-ascii fc-decoration absolute bottom-0 left-0 text-foreground/40 transition-colors duration-300 group-hover:text-[#FF8C00]/60 dark:text-foreground/20"
            dangerouslySetInnerHTML={{ __html: data[0] }}
            ref={ref}
            style={{
              whiteSpace: "pre",
              fontSize: "9px",
              lineHeight: "11px",
            }}
          />
        </div>

        <div className="relative flex-1">
          <div
            className="font-ascii fc-decoration absolute right-0 bottom-0 -scale-x-100 text-foreground/40 transition-colors duration-300 group-hover:text-[#FF8C00]/60 dark:text-foreground/20"
            dangerouslySetInnerHTML={{ __html: data[0] }}
            ref={ref2}
            style={{
              whiteSpace: "pre",
              fontSize: "9px",
              lineHeight: "11px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
