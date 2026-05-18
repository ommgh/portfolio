import { cn } from "@/lib/utils"

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto border-x border-edge md:max-w-3xl">
      <div
        className={cn(
          "h-2 px-2",
          "before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw]"
        )}
      />
      {children}
    </div>
  )
}
