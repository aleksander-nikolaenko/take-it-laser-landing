import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist';
const srcFolder = './src';

export const paths = {
  build: {
    js: `${buildFolder}/js/`,
    scss: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    files: `${buildFolder}/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
  },
  src: {
    js: `${srcFolder}/js/index.js`,
    scss: `${srcFolder}/scss/index.scss`,
    html: `${srcFolder}/html/pages/*.html`,
    files: `${srcFolder}/files/**/*.*`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,ico,webp}`,
    jpgPng: `${srcFolder}/img/**/*.{jpg,jpeg,png}`,
    svg: `${srcFolder}/img/**/*.svg`,
    icons: `${srcFolder}/icons/**/*.svg`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/scss/**/*.scss`,
    html: `${srcFolder}/html/**/*.html`,
    files: `${srcFolder}/files/**/*.*`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
};
