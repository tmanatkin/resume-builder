# Resume Builder

A markdown-based resume builder that generates professional HTML and PDF resumes from markdown files. This tool allows you to maintain your resume content in separate, organized markdown files and automatically builds styled HTML and PDF outputs.

## Features

- 📝 **Markdown-based**: Write your resume content in clean, version-controllable (optional) markdown
- 🎨 **Modern styling**: Professional, clean design with customizable SCSS
- 📄 **Multiple formats**: Generate both HTML and PDF versions
- 🔧 **Configurable**: Easily modify app configuration through YAML config file
- 🔄 **Auto-rebuild**: HTML auto rebuild mode for automatic changes during development
- 📁 **Modular structure**: Separate your resume into any logical sections of your choice

## Project Structure

```
resume-builder/
├── config.yaml                 # Configuration file (copy from config.template.yaml)
├── config.template.yaml        # Template configuration file
├── package.json                # Dependencies and scripts
├── src/
│   ├── template.hbs            # Handlebars template for HTML generation
│   ├── scripts/
│   │   ├── build-html.mjs      # HTML generation script
│   │   ├── build-pdf.mjs       # PDF generation script
│   │   ├── combine-md.mjs      # Markdown combination utility
│   │   └── config-loader.mjs   # YAML Configuration loader
│   └── scss/
│       ├── main.scss
│       ├── _variables.scss     # SCSS variables
│       ├── _fonts.scss         # Font definitions
│       ├── _reset.scss         # CSS reset
│       └── _styles.scss        # Main styles
└── example/
    ├── markdown/               # Example markdown files
    │   ├── header.md
    │   ├── education.md
    │   ├── experience.md
    │   └── skills.md
    └── build/                  # Generated example output files
        ├── example_resume.html
        ├── example_resume.md
        └── example_resume.pdf
```

## Prerequisites

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/tmanatkin/resume-builder.git
cd resume-builder
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Config File from Template

```bash
cp config.template.yaml config.yaml
```

### 4. Build Example Resume

#### Make a small change to one of the existing example markdown files, for example:

```diff
- # John Doe
+ # Your Name
```

#### Choose a Build Option:

- **Build HTML and PDF**

  ```bash
  npm run build
  ```

- **Build only HTML**

  ```bash
  npm run build:html
  ```

- **Build only PDF**

  ```bash
  npm run build:pdf
  ```

- **HTML Auto-Rebuild (useful during development)**

  ```bash
  npm run build:html:auto
  ```

  > **Note:** The auto-rebuild command will watch for changes in your markdown files and SCSS styles, automatically rebuilding the HTML when changes are detected.

### 5. Run Build And View Results!

---

**Congratulations!** You have successfully set up and tested the resume builder.<br>
It is _**strongly reccomended**_ to create your own seperate private repo and store your markdown files there for version control.<br>
This project is meant to be flexible and adjust to your needs, so customize this solution however you see fit.

## Customization

### Customize Config File

1. `markdownFilesDir` is where you want to store your markdown files:

   ```yaml
   # directory where input markdown files are stored
   markdownFilesDir: "../resume-md/markdown/"
   ```

2. `markdownFilesInOrder` are what specific sections you want to appear in your resume, as well as their order:

   ```yaml
   # order that markdown sections will appear in resume
   markdownFilesInOrder: ["header.md", "education.md", "experience.md", "skills.md"]
   ```

3. `markdownFilesDir` is the directory where your resume will be built (combined markdown, HTML, PDF):

   ```yaml
   # directory where resume will be built
   buildDir: "../resume-md/build/"
   ```

4. `markdownFilesDir` will be the name of your resume files that are built (name.md, name.html, name.pdf):

   ```yaml
   # filename of resume
   buildFileName: "resume"
   ```

### Create Your Own Markdown Files

Create your resume content using the same markdown filenames specified in `config.yaml`.<br>
Use the example files in `example/markdown/` as a reference.

#### Markdown Syntax

##### Organization

- **Title**: `# Your Name`
- **Section**: `## Section Name`
- **Subsection**: `### Subsection Name`
- **List**: `- List Item`

##### Text

- **Bold**: `**Bold Text**`
- **Italic**: `_Italic Text_`
- **Link**: `[Link Text](https://example.com)`

##### Custom Properties

- **Space Between Block**: `Left Text >>> Right Text`
  > **Note:** When placed between two pieces of text on the same line, this will space them apart to the edges of the page.<br>
  > This is useful for listing dates or other information for subsections on the right side of a page.<br>
  > View example markdown for use cases.
