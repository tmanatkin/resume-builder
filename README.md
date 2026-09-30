# Resume Builder

Resume and cover letter builder that converts Markdown to PDF.

![Node.js](https://img.shields.io/badge/Node.js-222222?style=for-the-badge&logo=nodedotjs)
![Markdown](https://img.shields.io/badge/Markdown-222222?style=for-the-badge&logo=markdown)
![Puppeteer](https://img.shields.io/badge/Puppeteer-222222?style=for-the-badge&logo=puppeteer)
![Sass](https://img.shields.io/badge/Sass-222222?style=for-the-badge&logo=sass)

- Content stored as Markdown, built as styled HTML and PDF
- YAML config for section order, file names, and output folders
- Auto-rebuild of HTML while editing

## Getting Started

```bash
npm install
cp config.template.yaml config.yaml
npm run build
```

Edit `config.yaml` to point to your own Markdown files, using `example/markdown/` as a reference. Keeping your Markdown in a separate private repo is recommended.

| Command                   | Builds                      |
| ------------------------- | --------------------------- |
| `npm run build`           | HTML and PDF                |
| `npm run build:html`      | HTML only                   |
| `npm run build:pdf`       | PDF only                    |
| `npm run build:html:auto` | HTML, rebuilding on changes |

## Custom Syntax

`Left text >>> Right text` places the two pieces of text at opposite edges of the page, for things like dates next to a job title.
