import Image from "next/image";

import { H4, TextSmall } from "@/components/text";

import { Project } from "@/lib/projects";
import { ExternalLinkIcon, GithubIcon } from "lucide-react";

const ProjectCard = ({ project }: { project: Project }) => {
  const { title, description, tags, url, githubUrl } = project;
  const { logo } = project;

  const Logo =
    typeof logo === "string"
      ? () => <Image src={logo} height="40" width="40" alt="Project logo" />
      : project.logo;

  return (
    <div className="border border-base-200 rounded-xl p-6 flex flex-col">
      <header className="flex items-center justify-between">
        <Logo className="w-10 h-10" />
        <div className="flex items-center gap-3">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <GithubIcon className="w-5 h-5" />
            </a>
          )}
          <a href={url} target="_blank" rel="noopener noreferrer">
            <ExternalLinkIcon className="w-5 h-5" />
          </a>
        </div>
      </header>
      <main className="flex-grow mt-4">
        <H4 className="mb-3">{title}</H4>
        <TextSmall>{description}</TextSmall>
      </main>
    </div>
  );
};

export default ProjectCard;
