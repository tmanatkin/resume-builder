import fs from "fs";
import chokidar from "chokidar";
import * as sass from "sass";
import handlebars from "handlebars";
import markdownIt from "markdown-it";
import combineResumeMarkdown from "./combine-md.mjs";
import config from "./config-loader.mjs";

// single build on start
await build();
console.log("HTML build complete.");

// constant auto-build using watcher
if (process.argv.includes("--auto")) {
  const watcher = chokidar.watch(["./src", config.resumeMarkdownDir], {
    ignoreInitial: true,
    ignored: /src\/scripts/ // ignore all script files
  });

  watcher.on("change", async () => {
    await build();
    console.log("Changes saved and built.");
    console.log("Watching for changes...");
  });

  console.log("Watching for changes...");
}

// convert custom space between blocks to correct HTML
function convertSpaceBetweenBlock(markdown) {
  return markdown.replace(/^(.*?)>>> *(.*?) *$/gm, (_, left, right) => {
    const md = new markdownIt({ html: true });
    const renderedLeft = md.render(left.trim());
    const renderedRight = md.render(right.trim());

    return `<div style="display: flex; flex-direction: row; justify-content: space-between; align-items: end;">${renderedLeft} ${renderedRight}</div>`;
  });
}

// main build function
async function build() {
  const templateFile = fs.readFileSync("./src/template.hbs", "utf8");

  // combine resume markdown files
  await combineResumeMarkdown();
  const resumeMarkdown = fs.readFileSync(`${config.buildDir}${config.resumeFileName}.md`, "utf8");

  // get cover letter markdown
  const coverLetterMarkdown = fs.readFileSync(`${config.coverLetterMarkdown}`, "utf8");

  // create markdown-it instance
  const md = new markdownIt({ html: true });

  // compile SCSS
  const styles = sass.compile("./src/scss/main.scss", {
    style: "compressed"
  });

  // convert space between blocks
  const convertedResumeMarkdown = convertSpaceBetweenBlock(resumeMarkdown);

  // render markdown to HTML
  const resumeBody = md.render(convertedResumeMarkdown);
  const coverLetterBody = md.render(coverLetterMarkdown);

  // write HTML to file using template
  const template = handlebars.compile(templateFile);
  const resumeHTML = template({ body: resumeBody, styles: styles.css });
  const coverLetterHTML = template({ body: coverLetterBody, styles: styles.css });
  await fs.promises.writeFile(`${config.buildDir}${config.resumeFileName}.html`, resumeHTML);
  await fs.promises.writeFile(`${config.buildDir}${config.coverLetterFileName}.html`, coverLetterHTML);
}
