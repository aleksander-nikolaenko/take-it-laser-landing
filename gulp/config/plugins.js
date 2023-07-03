import { deleteAsync } from 'del';
import fileInclude from 'gulp-file-include';
import replace from 'gulp-replace';
import rename from 'gulp-rename';
import versionNumber from 'gulp-version-number';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import browserSync from 'browser-sync';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import webpack from 'webpack-stream';
import avif from 'gulp-avif';
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';
import flatten from 'gulp-flatten';
import svgSprite from 'gulp-svg-sprite';
import IfPlugin from 'gulp-if';

const sass = gulpSass(dartSass);

export const plugins = {
  del: deleteAsync,
  fileInclude,
  replace,
  rename,
  versionNumber,
  plumber,
  notify,
  browserSync,
  sass,
  cleanCss,
  autoprefixer,
  groupCssMediaQueries,
  webpack,
  avif,
  webp,
  imagemin,
  newer,
  fonter,
  ttf2woff2,
  flatten,
  svgSprite,
  if: IfPlugin,
};
