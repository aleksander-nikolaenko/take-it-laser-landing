import gulp from 'gulp';
import { paths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';

export const imagesMin = () => {
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
    .pipe(plugins.newer(paths.build.images))
    .pipe(plugins.avif())
    .pipe(gulp.dest(paths.build.images))

    .pipe(gulp.src(paths.src.images))
    .pipe(plugins.newer(paths.build.images))
    .pipe(plugins.webp())
    .pipe(gulp.dest(paths.build.images))

    .pipe(gulp.src(paths.src.images))
    .pipe(plugins.newer(paths.build.images))
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(paths.build.images))

    .pipe(gulp.src(paths.src.svg))
    .pipe(plugins.newer(paths.build.images))
    .pipe(gulp.dest(paths.build.images));
};
