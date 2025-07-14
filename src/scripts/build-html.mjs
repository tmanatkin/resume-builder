import fs from "fs";
import chokidar from "chokidar";
import * as sass from "sass";
import handlebars from "handlebars";
import markdownIt from "markdown-it";
import container from "markdown-it-container";
import { combineMarkdown } from "./combine-md.mjs";

// single build on start
await build();
console.log("HTML build complete.");

// constant auto-build using watcher
if (process.argv.includes("--auto")) {
  const watcher = chokidar.watch("./src", {
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

// main build function
async function build() {
  const templateFile = fs.readFileSync("./src/template.hbs", "utf8");

  // combine markdown files
  await combineMarkdown();

  const markdown = fs.readFileSync("./build/resume.md", "utf8");

  // create markdown-it instance
  const md = new markdownIt({ html: true });

  // compile SCSS
  const styles = sass.compile("./src/scss/main.scss", {
    style: "compressed"
  });

  // render markdown to HTML
  const body = md.render(markdown);

  // write HTML to file using template
  const template = handlebars.compile(templateFile);
  const html = template({ body, styles: styles.css });
  await fs.promises.writeFile("./build/resume.html", html);
}
