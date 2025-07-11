import fs from "fs";

const markdownDirectory = "./src/markdown/sections";
const markdownFiles = ["header.md", "education.md", "experience.md", "skills.md"];

function removeMdHtmlComments(markdown) {
  return markdown.replace(/<!--[\s\S]*?-->/g, "");
}

export const combineMarkdown = async () => {
  const files = await Promise.all(markdownFiles.map((file) => fs.promises.readFile(`${markdownDirectory}/${file}`, "utf8")));
  const rawMarkdown = files.join("\n");
  const cleanMarkdown = removeMdHtmlComments(rawMarkdown);
  fs.writeFileSync("./src/markdown/resume.md", cleanMarkdown, "utf8");
};
