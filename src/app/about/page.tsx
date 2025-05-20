"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { HyperText } from "@/components/magicui/hyper-text";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";

const ExperienceSection = () => {
  const experiences = [
    {
      company: "Synapse",
      type: "Full-time",
      location: "Remote",
      role: "Founder",
      period: "June 2024 – Continuing",
      points: [
        "Built YardsToAcres, a platform for real estate agents",
        "Engineered NEXA, a crypto gaming platform",
        "Outreached to 100+ clients",
      ],
    },
    {
      company: "BashCraft Club",
      type: "Part-time",
      location: "Remote",
      role: "Technical Lead",
      period: "August 2024 – April 2025",
      points: [
        "Built the landing page for the club",
        "Built Thee.js based ID card generator",
        "Lead the team of 5 developers",
      ],
    },
  ];

  return (
    <div className="h-full w-full overflow-y-auto p-6">
      <HyperText className="mb-6 text-2xl text-black dark:text-white font-bold">
        Experience
      </HyperText>
      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <div key={idx} className="rounded-lg border p-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-lg font-semibold text-black dark:text-white">
                {exp.company}
              </h3>
              <div className="flex gap-2 text-xs">
                <span className="rounded  px-2 py-0.5 border-2">
                  {exp.type}
                </span>
                <span className="rounded px-2 py-0.5 border-2">
                  {exp.location}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500">{exp.role}</p>
            <p className="text-xs text-gray-400">{exp.period}</p>
            <ul className="mt-2 list-disc list-inside text-sm space-y-1">
              {exp.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Link
        href="/resume"
        prefetch
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "sm",
          }),
          "w-full text-xs mt-5 gap-2"
        )}
      >
        <span>Open To New Positions</span>{" "}
        <ArrowRightIcon className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
};

function Gallery() {
  const items = [
    {
      title: "Diwali",
      image:
        "https://res.cloudinary.com/dcwsgwsfw/image/upload/v1747697199/ommishra/WhatsApp_Image_2025-05-20_at_2.46.50_AM_1_g4f3pa.jpg",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: "Hawa Mahal",
      image:
        "https://res.cloudinary.com/dcwsgwsfw/image/upload/v1747697112/ommishra/WhatsApp_Image_2025-05-20_at_4.48.05_AM_db5cip.jpg",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: "Sonar Quila",
      image:
        "https://res.cloudinary.com/dcwsgwsfw/image/upload/v1747697093/ommishra/WhatsApp_Image_2025-05-20_at_4.46.18_AM_ujls8w.jpg",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
      title: "Ghanta Ghar",
      image:
        "https://res.cloudinary.com/dcwsgwsfw/image/upload/v1747697105/ommishra/WhatsApp_Image_2025-05-20_at_4.46.34_AM_ub914o.jpg",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: "Bonfire",
      image:
        "https://res.cloudinary.com/dcwsgwsfw/image/upload/v1747697081/ommishra/WhatsApp_Image_2025-05-20_at_4.45.23_AM_hvt8dn.jpg",
      className: "absolute top-24 left-[45%] rotate-[-7deg]",
    },
    {
      title: "Ghats",
      image:
        "https://res.cloudinary.com/dcwsgwsfw/image/upload/v1747697029/ommishra/WhatsApp_Image_2025-05-20_at_4.41.44_AM_tmc7tt.jpg",
      className: "absolute top-8 left-[30%] rotate-[4deg]",
    },
    {
      title: "Upper Lake",
      image:
        "https://res.cloudinary.com/dcwsgwsfw/image/upload/v1747697178/ommishra/WhatsApp_Image_2025-05-20_at_4.51.41_AM_1_l6kbtp.jpg",
      className: "absolute top-24 left-[45%] rotate-[-7deg]",
    },
    {
      title: "Light Show",
      image:
        "https://res.cloudinary.com/dcwsgwsfw/image/upload/v1747697131/ommishra/WhatsApp_Image_2025-05-20_at_4.48.50_AM_bkpjzz.jpg",
      className: "absolute top-8 left-[30%] rotate-[4deg]",
    },
    {
      title: "Desert Safari",
      image:
        "https://res.cloudinary.com/dcwsgwsfw/image/upload/v1747697070/ommishra/WhatsApp_Image_2025-05-20_at_4.44.32_AM_xs8bdp.jpg",
      className: "absolute top-20 right-[35%] rotate-[2deg]",
    },
  ];

  return (
    <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip mt-52">
      <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
        Travel isn&apos;t just about the places you go
      </p>
      {items.map((item, index) => (
        <DraggableCardBody key={item.title || index} className={item.className}>
          <img
            src={item.image}
            alt={item.title}
            className="pointer-events-none relative z-10 h-80 w-80 object-cover"
          />
          <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="h-screen">
      <div className="h-full w-full grid grid-cols-1 lg:grid-cols-3">
        <div className="hidden lg:block h-full overflow-y-auto border-r">
          <ExperienceSection />
        </div>
        <div className="h-full w-full">{isMounted && <ID />}</div>
        <div className="hidden lg:block h-full overflow-hidden border-l">
          <Gallery />
        </div>
      </div>
    </div>
  );
}
