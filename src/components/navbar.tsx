"use client";
import Link from "next/link";

import Container from "./container";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./theme-toggle";

const Navbar = () => {
  return (
    <header className="py-12">
      <Container className="flex justify-between items-center">
        <nav className="flex items-center gap-8">
          <Link href="/" prefetch>
            <div className={cn("font-medium")}>home</div>
          </Link>
          <Link href="/projects" prefetch>
            <div className={cn("font-medium")}>projects</div>
          </Link>
          <Link href="/blog" prefetch>
            <div className={cn("font-medium")}>blog</div>
          </Link>
          <Link href="/hire" prefetch>
            <div className={cn("font-medium")}>hire</div>
          </Link>
        </nav>
        <ModeToggle />
      </Container>
    </header>
  );
};

export default Navbar;
