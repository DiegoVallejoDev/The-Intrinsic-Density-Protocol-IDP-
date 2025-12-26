# CSS Framework & Demo Architecture Plan

## 1. Directory Structure
Adhere strictly to this layout to ensure build scripts resolve paths correctly.

.
├── dist/                  # Artifact output (Gitignored)
├── node_modules/
├── scripts/
│   └── build-demo.js      # Site generator script
├── src/
│   ├── demo/
│   │   ├── demo.css       # Demo-specific styling
│   │   ├── demo.js        # Demo-specific logic
│   │   └── template.html  # HTML Shell for README injection
│   └── index.css          # Framework Entry Point (@imports)
├── .gitignore
├── package.json
├── README.md              # Content source for index.html
└── rollup.config.js       # Framework bundler config

---

## 2. Dependencies
Install the required toolchain for Rollup (Framework) and Node (Demo Site).

npm install --save-dev rollup rollup-plugin-postcss postcss postcss-import autoprefixer cssnano rollup-plugin-delete marked

---

## 3. Configuration & Scripts

### A. `rollup.config.js`
**Function:** Generates `framework.css` and `framework.min.css` in `/dist`. Removes JS artifacts.

import postcss from 'rollup-plugin-postcss';
import atImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import del from 'rollup-plugin-delete';
import path from 'path';

const CONFIG = {
  input: 'src/index.css',
  outDir: 'dist',
  pkgName: 'my-framework' 
};

const createConfig = (isMinified) => {
  const extension = isMinified ? '.min.css' : '.css';
  const fileName = `${CONFIG.pkgName}${extension}`;
  const postcssPlugins = [atImport(), autoprefixer()];
  
  if (isMinified) postcssPlugins.push(cssnano());

  return {
    input: CONFIG.input,
    output: { file: `${CONFIG.outDir}/_tmp.js`, format: 'es' }, // Temp JS
    plugins: [
      postcss({
        extract: path.resolve(CONFIG.outDir, fileName),
        minimize: isMinified,
        sourceMap: true,
        plugins: postcssPlugins,
      }),
      del({ targets: `${CONFIG.outDir}/_tmp.js`, hook: 'closeBundle' }) // Cleanup
    ],
    onwarn(warning, warn) {
      if (warning.code === 'FILE_NAME_CONFLICT' || warning.code === 'EMPTY_BUNDLE') return;
      warn(warning);
    }
  };
};

export default [createConfig(false), createConfig(true)];


### B. `scripts/build-demo.js`
**Function:** Compiles README.md, injects into template, copies assets from `/src/demo` to `/dist`.

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const PATHS = {
  readme: path.resolve(__dirname, '../README.md'),
  template: path.resolve(__dirname, '../src/demo/template.html'),
  srcDir: path.resolve(__dirname, '../src/demo'),
  outDir: path.resolve(__dirname, '../dist'),
  outHtml: path.resolve(__dirname, '../dist/index.html'),
};

const PLACEHOLDER = '';

async function build() {
  // 1. Setup
  if (!fs.existsSync(PATHS.outDir)) fs.mkdirSync(PATHS.outDir, { recursive: true });

  // 2. Build HTML
  console.log('Building HTML...');
  const readmeContent = fs.readFileSync(PATHS.readme, 'utf8');
  const htmlBody = marked.parse(readmeContent);
  const template = fs.readFileSync(PATHS.template, 'utf8');
  
  if (!template.includes(PLACEHOLDER)) throw new Error(`Missing ${PLACEHOLDER}`);
  fs.writeFileSync(PATHS.outHtml, template.replace(PLACEHOLDER, htmlBody));

  // 3. Copy Assets (Flattened)
  console.log('Copying Assets...');
  ['demo.css', 'demo.js'].forEach(file => {
    const src = path.join(PATHS.srcDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(PATHS.outDir, file));
    }
  });
}

build().catch(e => { console.error(e); process.exit(1); });


### C. `package.json`
**Function:** Orchestrates the pipeline.

{
  "name": "my-framework",
  "version": "1.0.0",
  "main": "dist/my-framework.css",
  "style": "dist/my-framework.css",
  "files": [
    "dist"
  ],
  "scripts": {
    "build:framework": "rollup -c",
    "build-demo-website": "npm run build:framework && node scripts/build-demo.js"
  }
}

---

## 4. Source Files

### A. `src/demo/template.html`
**Function:** Shell for the documentation site.

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documentation</title>
    <link rel="stylesheet" href="my-framework.min.css">
    <link rel="stylesheet" href="demo.css">
</head>
<body>
    <main>
        </main>
    <script src="demo.js"></script>
</body>
</html>

---

## 5. Deployment (Vercel)

* **Build Command:** `npm run build-demo-website`
* **Output Directory:** `dist`