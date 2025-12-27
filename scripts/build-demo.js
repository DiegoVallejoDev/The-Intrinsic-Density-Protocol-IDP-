import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PATHS = {
    readme: path.resolve(__dirname, '../README.md'),
    template: path.resolve(__dirname, '../src/demo/template.html'),
    srcDir: path.resolve(__dirname, '../src/demo'),
    outDir: path.resolve(__dirname, '../dist'),
    outHtml: path.resolve(__dirname, '../dist/index.html'),
};

const PLACEHOLDER = '{{README_CONTENT}}';

async function build() {
    // 1. Setup output directory
    if (!fs.existsSync(PATHS.outDir)) {
        fs.mkdirSync(PATHS.outDir, { recursive: true });
    }

    // 2. Build HTML from README
    console.log('📄 Building HTML from README.md...');
    const readmeContent = fs.readFileSync(PATHS.readme, 'utf8');
    const htmlBody = marked.parse(readmeContent);
    const template = fs.readFileSync(PATHS.template, 'utf8');

    if (!template.includes(PLACEHOLDER)) {
        throw new Error(`Missing placeholder ${PLACEHOLDER} in template.html`);
    }

    fs.writeFileSync(PATHS.outHtml, template.replace(PLACEHOLDER, htmlBody));
    console.log('✅ Generated dist/index.html');

    // 3. Copy demo assets (flattened to dist/)
    console.log('📦 Copying demo assets...');
    const assetsToCopy = ['demo.css', 'demo.js'];

    assetsToCopy.forEach(file => {
        const src = path.join(PATHS.srcDir, file);
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, path.join(PATHS.outDir, file));
            console.log(`   ✅ Copied ${file}`);
        } else {
            console.log(`   ⚠️  Skipped ${file} (not found)`);
        }
    });

    console.log('\n🎉 Demo site build complete!');
}

build().catch(e => {
    console.error('❌ Build failed:', e);
    process.exit(1);
});
