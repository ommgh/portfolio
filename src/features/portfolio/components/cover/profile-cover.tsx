import { FlickeringGrid } from "@/components/magicui/flickering-grid"

export function ProfileCover() {
  return (
    <div className="group screen-line-before screen-line-after relative aspect-2/1 border-x border-edge p-4 before:-top-px after:-bottom-px sm:aspect-3/1">
      <FlickeringGrid className="dark:hidden" />
      <FlickeringGrid
        className="hidden dark:block"
        color="rgb(255, 255, 255)"
      />
    </div>
  )
}
