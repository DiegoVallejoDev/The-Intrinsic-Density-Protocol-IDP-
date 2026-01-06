import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PATHS = {
    readme: path.resolve(__dirname, '../README.md'),
    templatesDir: path.resolve(__dirname, '../templates'),
    outDir: path.resolve(__dirname, '../dist'),
};

const PLACEHOLDER = '{{README_CONTENT}}';

async function build() {
    // 1. Setup output directory
    if (!fs.existsSync(PATHS.outDir)) {
        fs.mkdirSync(PATHS.outDir, { recursive: true });
    }

    // 2. Build index.html from README + template
    console.log('📄 Building index.html from README.md...');
    let readmeContent = fs.readFileSync(PATHS.readme, 'utf8');

    // Remove logo from README (it's in the template)
    readmeContent = readmeContent.replace('<img src="./src/demo/IDP_logo.png" alt="IDP Logo" width="39%">', '');
    readmeContent = readmeContent.replace('<img src="./templates/IDP_logo.png" alt="IDP Logo" width="39%">', '');

    const htmlBody = marked.parse(readmeContent);
    const templatePath = path.join(PATHS.templatesDir, 'index.html');
    let template = fs.readFileSync(templatePath, 'utf8');

    if (!template.includes(PLACEHOLDER)) {
        throw new Error(`Missing placeholder ${PLACEHOLDER} in index.html`);
    }

    // Process index.html: inject README and fix paths
    let indexHtml = template.replace(PLACEHOLDER, htmlBody);
    indexHtml = indexHtml.replace(/\.\.\/dist\//g, './');

    fs.writeFileSync(path.join(PATHS.outDir, 'index.html'), indexHtml);
    console.log('✅ Generated dist/index.html');

    // 3. Copy all template assets
    console.log('📦 Copying template assets...');
    const assetsToCopy = ['demo.css', 'demo.js', 'IDP_logo.png'];

    assetsToCopy.forEach(file => {
        const src = path.join(PATHS.templatesDir, file);
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, path.join(PATHS.outDir, file));
            console.log(`   ✅ Copied ${file}`);
        } else {
            console.log(`   ⚠️  Skipped ${file} (not found)`);
        }
    });

    // 4. Copy other HTML templates and fix paths
    console.log('📑 Copying HTML templates...');
    const htmlFiles = fs.readdirSync(PATHS.templatesDir)
        .filter(f => f.endsWith('.html') && f !== 'index.html');

    htmlFiles.forEach(file => {
        const src = path.join(PATHS.templatesDir, file);
        let content = fs.readFileSync(src, 'utf8');

        // Fix CSS paths: ../dist/ -> ./ (since they'll be in the same folder when deployed)
        content = content.replace(/\.\.\/dist\//g, './');

        fs.writeFileSync(path.join(PATHS.outDir, file), content);
        console.log(`   ✅ Copied & fixed ${file}`);
    });

    console.log('\n🎉 Demo site build complete!');
    console.log('📁 Output files in dist/:');
    console.log('   - index.html (main demo)');
    htmlFiles.forEach(f => console.log(`   - ${f}`));
    assetsToCopy.forEach(f => console.log(`   - ${f}`));
}

build().catch(e => {
    console.error('❌ Build failed:', e);
    process.exit(1);
});
