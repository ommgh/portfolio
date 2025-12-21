import HeroFlame from "./flames/flame";

export function ProfileCover() {
  return (
    <div className="group screen-line-before screen-line-after relative aspect-2/1 border-x border-edge before:-top-px after:-bottom-px sm:aspect-3/1">
      <HeroFlame />
    </div>
  );
}
