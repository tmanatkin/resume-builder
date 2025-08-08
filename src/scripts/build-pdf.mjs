import fs from "fs";
import puppeteer from "puppeteer";
import config from "./config-loader.mjs";

const resumeHTML = fs.readFileSync(`${config.buildDir}${config.resumeFileName}.html`, "utf8");
const coverLetterHTML = fs.readFileSync(`${config.buildDir}${config.coverLetterFileName}.html`, "utf8");

// create PDF from HTML
const browser = await puppeteer.launch();

// resume page
const resumePage = await browser.newPage();
await resumePage.setContent(resumeHTML, { waitUntil: "networkidle0" });
await resumePage.pdf({ path: `${config.buildDir}${config.resumeFileName}.pdf`, format: "A4" });
await resumePage.close();

// cover letter page
const coverLetterPage = await browser.newPage();
await coverLetterPage.setContent(coverLetterHTML, { waitUntil: "networkidle0" });
await coverLetterPage.pdf({ path: `${config.buildDir}${config.coverLetterFileName}.pdf`, format: "A4" });

await coverLetterPage.close();

await browser.close();

console.log("PDF build complete.");
