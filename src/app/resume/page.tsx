import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Om Mishra | Resume",
  description: "View the resume of Om Mishra",
  robots: "noindex, nofollow",
};

export default function ResumePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl h-[90vh] shadow-lg border rounded-md overflow-hidden">
        <iframe
          src="/resume.pdf"
          className="w-full h-full"
          title="Om Mishra Resume"
        />
      </div>
    </main>
  );
}
