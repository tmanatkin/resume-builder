import fs from "fs";
import markdownIt from "markdown-it";
import config from "./config-loader.mjs";

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

const combineMarkdown = async () => {
  const files = await Promise.all(config.markdownFilesInOrder.map((file) => fs.promises.readFile(`${config.markdownFilesDir}${file}`, "utf8")));
  const rawMarkdown = files.join("\n");
  const removedCommentsMd = removeMdHtmlComments(rawMarkdown);
  const convertedBlocksMd = convertSpaceBetweenBlock(removedCommentsMd);
  fs.writeFileSync(`${config.buildDir}${config.buildFileName}.md`, convertedBlocksMd, "utf8");
};

export default combineMarkdown;
