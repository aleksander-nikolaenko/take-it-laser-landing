import gulp from 'gulp';
import { paths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';
import { mode } from '../../gulpfile.js';

export const scss = () => {
  return gulp
    .src(paths.src.scss, { sourcemaps: mode.isDev })
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: 'SCSS',
          message: 'Error: <%=error.message %>',
        })
      )
    )
    .pipe(plugins.replace(/@img\//g, '../img/'))
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(plugins.if(mode.isBuild, plugins.groupCssMediaQueries()))
    .pipe(
      plugins.if(
        mode.isBuild,
        plugins.autoprefixer({
          grid: true,
          overrideBrowserslist: ['last 3 versions'],
          cascade: true,
        })
      )
    )
    .pipe(
      plugins.rename({
        basename: 'styles',
        extname: '.css',
      })
    )
    .pipe(gulp.dest(paths.build.scss))
    .pipe(plugins.if(mode.isBuild, plugins.cleanCss()))
    .pipe(
      plugins.rename({
        basename: 'styles',
        extname: '.min.css',
      })
    )

    .pipe(gulp.dest(paths.build.scss))
    .pipe(plugins.browserSync.stream());
};
