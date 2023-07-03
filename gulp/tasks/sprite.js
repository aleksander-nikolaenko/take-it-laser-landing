import gulp from 'gulp';
import { plugins } from '../config/plugins.js';
import { paths } from '../config/paths.js';

export const sprite = () => {
  return gulp
    .src(paths.src.icons)
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: 'SVG',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      plugins.svgSprite({
        mode: {
          stack: {
            sprite: `../icons-sprite.svg`,
            // create page list icons
            // example: true,
          },
        },
      })
    )
    .pipe(gulp.dest(paths.build.images));
};
