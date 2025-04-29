"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { canHandle3D } from "@/lib/deviceSupport";

const SimpleFallback = () => (
  <div className="flex h-full w-full flex-col items-center justify-center bg-background p-8">
    <div className="mb-8 text-center">
      <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-muted-foreground p-4">
        <div className="h-full w-full rounded-full bg-muted-foreground p-3">
          <div className="h-full w-full rounded-full bg-muted-foreground"></div>
        </div>
      </div>
      <h2 className="mb-2 text-2xl font-bold text-white">About Me</h2>
      <p className="text-white">
        I&apos;m a developer with the love for shipping new products.
      </p>
    </div>
  </div>
);

const ID = dynamic(() => import("@/components/ID"), {
  ssr: false,
  loading: () => <LoadingFallback />,
});

const LoadingFallback = () => (
  <div className="flex h-full w-full items-center justify-center bg-background">
    <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

export default function AboutPage() {
  const [can3D, setCan3D] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setCan3D(canHandle3D());
  }, []);

  return (
    <div className="h-screen">
      {isMounted && (can3D ? <ID /> : <SimpleFallback />)}
    </div>
  );
}
