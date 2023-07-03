import gulp from 'gulp';
import { paths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';
import { mode } from '../../gulpfile.js';

export const html = () => {
  return gulp
    .src(paths.src.html)
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: 'HTML',
          message: 'Error: <%=error.message %>',
        })
      )
    )
    .pipe(plugins.fileInclude())
    .pipe(plugins.replace(/@img\//g, './img/'))
    .pipe(
      plugins.if(
        mode.isBuild,
        plugins.versionNumber({
          value: '%DT%',
          append: {
            key: '_v',
            cover: 0,
            to: ['css', 'js'],
          },
          output: {
            file: 'gulp/version.json',
          },
        })
      )
    )
    .pipe(gulp.dest(paths.build.html))
    .pipe(plugins.browserSync.stream());
};
