import { cn } from "@/lib/utils"

/**
 * The kolam reduced to its single smallest gesture: a stroke closed around one
 * pulli, with a dot either side to imply the grid it was lifted out of.
 *
 * Deliberately plain. At ornament size (around 20px tall) anything with more
 * than one enclosed shape turns into a smudge, so this keeps the one idea the
 * cover is built from — a line going around a dot — and drops everything else.
 */
export function KolamMark({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 48 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("h-5 w-15", className)}
      {...props}
    >
      {/* the neighbouring pulli, left and right */}
      <circle cx="6" cy="8" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="42" cy="8" r="1" fill="currentColor" opacity="0.5" />

      {/* the stroke, closed around the centre dot */}
      <circle
        cx="24"
        cy="8"
        r="5.5"
        stroke="currentColor"
        strokeWidth="1.1"
        fill="none"
      />
      <circle cx="24" cy="8" r="1.3" fill="currentColor" />
    </svg>
  )
}

/**
 * A horizontal rule broken by the kolam mark — the device Sarvam uses on their
 * section breaks, in our own motif.
 */
export function KolamDivider({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      <Rule />
      <KolamMark className="shrink-0 text-muted-foreground/50" />
      <Rule />
    </div>
  )
}

function Rule() {
  return (
    <div className="h-px flex-1 bg-(image:--rule-dot) bg-[length:var(--rule-pitch)_1px] bg-repeat-x" />
  )
}
