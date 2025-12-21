"use client";

import React from "react";

import { cn } from "@/lib/utils";

import { CoreFlame } from "./core-flame";

interface FlameBackgroundProps {
  animate?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function FlameBackground({
  animate = true,
  className,
  children,
}: FlameBackgroundProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 flex items-end justify-center">
        <CoreFlame
          className={cn(
            "transition-opacity duration-1000",
            animate && "animate-pulse"
          )}
        />
      </div>
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
