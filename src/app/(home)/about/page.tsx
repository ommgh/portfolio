import dynamic from "next/dynamic";
const ID = dynamic(() => import("@/app/(home)/about/ID"));

export default function LoginPage() {
  return (
    <>
      <div className="w-full h-screen flex flex-col lg:flex-row bg-white dark:bg-black text-black dark:text-white">
        <div className="lg:flex flex-1 items-center justify-center bg-black p-8">
          <ID />
        </div>
      </div>
    </>
  );
}
