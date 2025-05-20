import SiteHeader from "@/components/site-header";
import AboutMe from "@/components/about-me";
import PostsList from "@/components/posts-list";
// import { GithubGraph } from "@/components/github-graph";
import ProjectsList from "@/components/projects-list";
import SiteFooter from "@/components/site-footer";
import { FadeContainer, FadeItem } from "@/components/fade-motion";

export default async function Home() {
  return (
    <FadeContainer className="container items-center space-y-5 md:space-y-8">
      <FadeItem>
        <SiteHeader />
      </FadeItem>
      <FadeItem>
        <AboutMe />
      </FadeItem>
      {/* <FadeItem>
        <GithubGraph username="ommgh" blockMargin={3} />
      </FadeItem> */}
      <FadeItem>
        <ProjectsList />
      </FadeItem>
      <FadeItem>
        <PostsList category={"all"} />
      </FadeItem>
      <FadeItem>
        <SiteFooter />
      </FadeItem>
    </FadeContainer>
  );
}
