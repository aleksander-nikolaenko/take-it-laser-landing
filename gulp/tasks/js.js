import gulp from 'gulp';
import { paths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';
import { mode } from '../../gulpfile.js';

export const js = () => {
  return gulp
    .src(paths.src.js, { sourcemaps: mode.isDev })
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: 'JS',
          message: 'Error: <%=error.message %>',
        })
      )
    )
    .pipe(
      plugins.webpack({
        mode: mode.isBuild ? 'production' : 'development',
        // mode: 'production',
        output: {
          filename: 'main.min.js',
        },
      })
    )
    .pipe(gulp.dest(paths.build.js))
    .pipe(plugins.browserSync.stream());
};
