import { promises as fs } from "fs";

const markdownDirectory = "./src/markdown";
const markdownFiles = ["header.md", "experience.md", "education.md", "skills.md"];

export const markdownPromise = async () => {
  const files = await Promise.all(markdownFiles.map((file) => fs.readFile(`${markdownDirectory}/${file}`, "utf8")));
  return files.join("\n");
};
