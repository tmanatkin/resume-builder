import fs from "fs";
import puppeteer from "puppeteer";
import config from "./config-loader.mjs";

const html = fs.readFileSync(`${config.buildDir}${config.buildFileName}.html`, "utf8");

// create PDF from HTML
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle0" });
await page.pdf({ path: `${config.buildDir}${config.buildFileName}.pdf`, format: "A4" });
await browser.close();

console.log("PDF build complete.");
