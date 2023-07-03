import gulp from 'gulp';
import { paths } from '../config/paths.js';

export const copy = () => {
  return gulp.src(paths.src.files).pipe(gulp.dest(paths.build.files));
};
