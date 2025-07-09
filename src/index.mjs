// imports
import fs from "fs";
import * as sass from "sass";
import handlebars from "handlebars";
import markdownIt from "markdown-it";
import container from "markdown-it-container";
import puppeteer from "puppeteer";

// read files
const resumeFile = fs.readFileSync("./src/markdown/resume.md", "utf8");
const templateFile = fs.readFileSync("./src/template.hbs", "utf8");

// create markdown-it instance
const md = new markdownIt();
md.use(container, "side-by-side"); // add side-by-side container

// render markdown to HTML and compile SCSS
const body = md.render(resumeFile);
const styles = sass.compile("./src/scss/main.scss", {
  style: "compressed"
});

// write HTML to file using template
const template = handlebars.compile(templateFile);
const html = template({ body, styles: styles.css });
await fs.promises.writeFile("./output/resume.html", html);

// create PDF from HTML
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle0" });
await page.pdf({ path: "./output/resume.pdf", format: "A4" });
await browser.close();
