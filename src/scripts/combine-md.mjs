import fs from "fs";
import markdownIt from "markdown-it";
import config from "./config-loader.mjs";

function removeMdHtmlComments(markdown) {
  return markdown.replace(/<!--[\s\S]*?-->/g, "");
}

const combineMarkdown = async () => {
  const files = await Promise.all(config.markdownFilesInOrder.map((file) => fs.promises.readFile(`${config.markdownFilesDir}${file}`, "utf8")));
  const rawMarkdown = files.join("\n");
  const removedCommentsMd = removeMdHtmlComments(rawMarkdown);
  fs.writeFileSync(`${config.buildDir}${config.buildFileName}.md`, removedCommentsMd, "utf8");
};

export default combineMarkdown;
