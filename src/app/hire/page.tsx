import Container from "@/components/container";
import dynamic from "next/dynamic";
import HireNavbar from "./_components/hire-nav";

const ID = dynamic(() => import("@/app/hire/_components/ID"));

export default function LoginPage() {
  return (
    <>
      <HireNavbar />
      <main className=" flex-grow">
        <Container>
          <div className=" flex items-center justify-center"></div>
          <div className="w-full h-screen flex flex-col lg:flex-row bg-white dark:bg-black text-black dark:text-white">
            <div className="lg:flex flex-1 items-center justify-center bg-black p-8">
              <ID />
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
