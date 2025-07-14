import fs from "fs";

const markdownDirectory = "./../resume-md/markdown/";
const markdownFiles = ["header.md", "education.md", "experience.md", "skills.md"];

function removeMdHtmlComments(markdown) {
  return markdown.replace(/<!--[\s\S]*?-->/g, "");
}

function convertTitleDateBlocks(markdown) {
  return markdown.replace(/^\*\*(.+?)\*\* *>>> *(.+)$/gm, (_, title, date) => {
    return `<div style="display: flex; flex-direction: row; justify-content: space-between; margin: 0.75rem 0 0 0;"><p><strong>${title}</strong></p><p>${date}</p></div>`;
  });
}

export const combineMarkdown = async () => {
  const files = await Promise.all(markdownFiles.map((file) => fs.promises.readFile(`${markdownDirectory}${file}`, "utf8")));
  const rawMarkdown = files.join("\n");
  const removedCommentsMd = removeMdHtmlComments(rawMarkdown);
  const convertedBlocksMd = convertTitleDateBlocks(removedCommentsMd);
  fs.writeFileSync("./build/resume.md", convertedBlocksMd, "utf8");
};
