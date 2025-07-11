import fs from "fs";
import puppeteer from "puppeteer";

const html = fs.readFileSync("./output/resume.html", "utf8");

// create PDF from HTML
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle0" });
await page.pdf({ path: "./output/resume.pdf", format: "A4" });
await browser.close();

console.log("PDF build complete.");
