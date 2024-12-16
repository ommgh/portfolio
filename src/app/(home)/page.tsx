import Link from "next/link";

import ProjectCard from "@/components/project-card";
import { H1, H3, Text } from "@/components/text";

import { projects } from "@/lib/projects";

const HomePage = () => {
  const filteredProjects = projects.filter((project) => project.showOnHomepage);

  return (
    <>
      {/* Bio */}
      <div className="mt-6">
        <H1 className="mb-6">Hey, I&apos;m Om!</H1>
        <Text>
          I&apos;m currently working on{" "}
          <a
            href="https://bioshop.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#40C057] hover:underline"
          >
            bioshop.one
          </a>
          , a tool for creators to , organize their affiliate links, with a
          custom bioshop.one link to share with their audience and amplify thier
          user engagement.
        </Text>
        <br />
      </div>

      {/* Projects */}
      <div className="mt-12">
        <H3 className="mb-3">Projects</H3>
        <Text className="mb-6">
          Some other projects that I&apos;ve been working on in the past.
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Link href="/projects">
            <div className="text-primary text-center bg-base-200 rounded-lg px-4 py-2">
              See all projects
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
