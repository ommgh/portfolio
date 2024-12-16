import Container from "@/components/container";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provier";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
      >
        <Navbar />
        <main className=" flex-grow ">
          <Container>{children}</Container>
        </main>
        <Footer />
      </ThemeProvider>
    </div>
  );
}
