import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/types/type";

function readFile(filePath: string): Post | null {
  try {
    const rawContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(rawContent);
    const slug = path.basename(filePath, path.extname(filePath));

    // Extract the content type from the file path
    const contentDir = path.join(process.cwd(), "src", "content");
    const relativePath = path.relative(contentDir, filePath);
    const pathSegments = relativePath.split(path.sep);
    const type = pathSegments[0]; // The first directory under content/

    return {
      ...data,
      slug,
      content,
      type, // Add the content type/directory as the post type
    } as Post;
  } catch (error) {
    console.error(`Failed to read or parse the file at ${filePath}:`, error);
    return null;
  }
}

function getFilesRecursively(directory: string): string[] {
  try {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    const files = entries.flatMap((entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return getFilesRecursively(fullPath);
      } else if (path.extname(entry.name) === ".mdx") {
        return [fullPath];
      }
      return [];
    });
    return files;
  } catch (error) {
    console.error(`Failed to read directory at ${directory}:`, error);
    return [];
  }
}

export function getPostsByType(type: string): Post[] {
  return getPosts(type).filter((post) => post.type === type);
}

export function getPosts(directory: string): Post[] {
  let files: string[] = [];
  if (directory === "all") {
    const baseDir = path.join(process.cwd(), "src", "content");
    files = getFilesRecursively(baseDir);
  } else {
    const targetDir = path.join(process.cwd(), "src", "content", directory);
    files = getFilesRecursively(targetDir);
  }

  return files
    .map((file) => readFile(file))
    .filter((post): post is Post => post !== null);
}

// Add a new function to get a specific post by slug and type
export function getPostBySlug(directory: string, slug: string): Post | null {
  const posts = getPosts(directory);
  return posts.find((post) => post.slug === slug) || null;
}
