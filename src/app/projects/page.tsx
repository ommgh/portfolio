import React from "react";

import ProjectCard from "@/components/project-card";
import { H3, Text } from "@/components/text";
import { projects } from "@/lib/projects";

const ProjectsPage = () => {
  const personalProjects = projects.filter((project) => !project.hackathon);
  const hackathonProjects = projects.filter((project) => project.hackathon);

  return (
    <>
      <H3 className="mt-6 mb-3">Personal projects</H3>
      <Text className="mb-5">
        Some of the personal projects that I&apos;m working on or have built in
        the past.
      </Text>

      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
        {personalProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      <H3 className="mt-20 mb-3">Freelance Projects</H3>
      <Text className="mb-5">Some projects that I built for my clients</Text>

      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
        {hackathonProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </>
  );
};

export default ProjectsPage;
