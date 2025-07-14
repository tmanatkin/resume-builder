import fs from "fs";
import markdownIt from "markdown-it";

const markdownDirectory = "./../resume-md/markdown/";
const markdownFiles = ["header.md", "education.md", "experience.md", "skills.md"];

function removeMdHtmlComments(markdown) {
  return markdown.replace(/<!--[\s\S]*?-->/g, "");
}

function convertSpaceBetweenBlock(markdown) {
  return markdown.replace(/^(.*?)>>> *(.*?) *$/gm, (_, left, right) => {
    const md = new markdownIt({ html: true });
    const renderedLeft = md.render(left.trim());
    const renderedRight = md.render(right.trim());

    return `<div style="display: flex; flex-direction: row; justify-content: space-between; align-items: end;">${renderedLeft} ${renderedRight}</div>`;
  });
}

export const combineMarkdown = async () => {
  const files = await Promise.all(markdownFiles.map((file) => fs.promises.readFile(`${markdownDirectory}${file}`, "utf8")));
  const rawMarkdown = files.join("\n");
  const removedCommentsMd = removeMdHtmlComments(rawMarkdown);
  const convertedBlocksMd = convertSpaceBetweenBlock(removedCommentsMd);
  fs.writeFileSync("./build/resume.md", convertedBlocksMd, "utf8");
};
