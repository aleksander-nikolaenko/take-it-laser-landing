import gulp from 'gulp';

import { paths } from './gulp/config/paths.js';
import { plugins } from './gulp/config/plugins.js';
import { copy } from './gulp/tasks/copy.js';
import { clean } from './gulp/tasks/clean.js';
import { html } from './gulp/tasks/html.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { imagesMin } from './gulp/tasks/imagesMin.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { sprite } from './gulp/tasks/sprite.js';

function server() {
  return plugins.browserSync.init({
    server: {
      baseDir: paths.build.html,
    },
    startPath: '/index.html',
    notify: false,
    open: true,
    cors: true,
    ui: false,
    logPrefix: 'DevServer',
    host: 'localhost',
    port: process.env.PORT || 1234,
  });
}

function watcher() {
  gulp.watch(paths.watch.files, copy);
  gulp.watch(paths.watch.html, html);
  gulp.watch(paths.watch.scss, scss);
  gulp.watch(paths.watch.js, js);
  gulp.watch(paths.watch.images, images);
}

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const mainTasks = gulp.series(
  fonts,
  sprite,
  gulp.parallel(copy, html, scss, js, images)
);

const dev = gulp.series(clean, mainTasks, gulp.parallel(watcher, server));

const build = gulp.series(clean, mainTasks);

export const mode = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
};

export { imagesMin };
export { sprite };
export { fonts };
export { dev };
export { build };

gulp.task('default', dev);
