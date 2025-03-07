import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn("w-full max-w-3xl mx-auto px-6 md:px-10", className)}>
      {children}
    </div>
  );
};

export default Container;
