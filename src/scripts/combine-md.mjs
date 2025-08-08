import fs from "fs";
import config from "./config-loader.mjs";

function removeMdHtmlComments(markdown) {
  return markdown.replace(/<!--[\s\S]*?-->/g, "");
}

const combineResumeMarkdown = async () => {
  const files = await Promise.all(
    config.resumeMarkdownFilesInOrder.map((file) => fs.promises.readFile(`${config.resumeMarkdownDir}${file}`, "utf8"))
  );
  const rawMarkdown = files.join("\n");
  const removedCommentsMd = removeMdHtmlComments(rawMarkdown);
  fs.writeFileSync(`${config.buildDir}${config.resumeFileName}.md`, removedCommentsMd, "utf8");
};

export default combineResumeMarkdown;
