export function BrandMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 512 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M0 0h64v192H0V0Zm192 0v192h-64V64H64V0h128Zm64 0h64v192h-64V0Zm192 0v192h-64V64h-64v128h-64V0h192Z"
      />
    </svg>
  );
}

export function getMarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 512 256"><path fill="${color}" d="M0 0h64v192H0V0Zm192 0v192h-64V64H64V0h128Zm64 0h64v192h-64V0Zm192 0v192h-64V64h-64v128h-64V0h192Z"/></svg>`;
}
