import postcss from 'rollup-plugin-postcss';
import atImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import del from 'rollup-plugin-delete';
import path from 'path';

const CONFIG = {
  input: 'src/index.css',
  outDir: 'dist',
  pkgName: 'idp-framework'
};

const createConfig = (isMinified) => {
  const extension = isMinified ? '.min.css' : '.css';
  const fileName = `${CONFIG.pkgName}${extension}`;
  const postcssPlugins = [atImport(), autoprefixer()];

  if (isMinified) postcssPlugins.push(cssnano());

  return {
    input: CONFIG.input,
    output: { file: `${CONFIG.outDir}/_tmp.js`, format: 'es' },
    plugins: [
      postcss({
        extract: path.resolve(CONFIG.outDir, fileName),
        minimize: isMinified,
        sourceMap: true,
        plugins: postcssPlugins,
      }),
      del({ targets: `${CONFIG.outDir}/_tmp.js`, hook: 'closeBundle' })
    ],
    onwarn(warning, warn) {
      if (warning.code === 'FILE_NAME_CONFLICT' || warning.code === 'EMPTY_BUNDLE') return;
      warn(warning);
    }
  };
};

export default [createConfig(false), createConfig(true)];
