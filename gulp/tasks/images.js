import gulp from 'gulp';
import { paths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';
import { mode } from '../../gulpfile.js';

export const images = () => {
  return gulp
    .src(paths.src.jpgPng)
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: 'IMAGES',
          message: 'Error: <%=error.message %>',
        })
      )
    )
    .pipe(plugins.if(mode.isBuild, plugins.newer(paths.build.images)))
    .pipe(plugins.if(mode.isBuild, plugins.avif()))
    .pipe(plugins.if(mode.isBuild, gulp.dest(paths.build.images)))

    .pipe(plugins.if(mode.isBuild, gulp.src(paths.src.images)))
    .pipe(plugins.if(mode.isBuild, plugins.newer(paths.build.images)))
    .pipe(plugins.if(mode.isBuild, plugins.webp()))
    .pipe(plugins.if(mode.isBuild, gulp.dest(paths.build.images)))

    .pipe(gulp.src(paths.src.images))
    .pipe(plugins.newer(paths.build.images))
    .pipe(plugins.if(mode.isBuild, plugins.imagemin()))
    .pipe(gulp.dest(paths.build.images))

    .pipe(gulp.src(paths.src.svg))
    .pipe(plugins.newer(paths.build.images))
    .pipe(gulp.dest(paths.build.images))

    .pipe(plugins.browserSync.stream());
};
