import fs from 'fs';
import gulp from 'gulp';
import { plugins } from '../config/plugins.js';
import { paths } from '../config/paths.js';

export const otfToTtf = () => {
  return gulp
    .src(`${paths.srcFolder}/fonts/**/*.otf`)
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: 'FONTS',
          message: 'Error: <%=error.message %>',
        })
      )
    )
    .pipe(
      plugins.fonter({
        formats: ['ttf'],
      })
    )
    .pipe(gulp.dest(`${paths.srcFolder}/fonts/`));
};

export const ttfToWoff = () => {
  return gulp
    .src(`${paths.srcFolder}/fonts/**/*.ttf`)
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: 'FONTS',
          message: 'Error: <%=error.message %>',
        })
      )
    )
    .pipe(
      plugins.fonter({
        formats: ['woff'],
      })
    )
    .pipe(plugins.flatten())
    .pipe(gulp.dest(paths.build.fonts))

    .pipe(gulp.src(`${paths.srcFolder}/fonts/**/*.ttf`))
    .pipe(plugins.ttf2woff2())
    .pipe(plugins.flatten())
    .pipe(gulp.dest(paths.build.fonts));
};

export const fontsStyle = () => {
  let fontsFile = `${paths.srcFolder}/scss/base/fonts.scss`;
  fs.readdir(paths.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          let fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly != fontFileName) {
            let fontName = fontFileName.split('-')[0]
              ? fontFileName.split('-')[0]
              : fontFileName;
            let fontWeight = fontFileName.split('-')[1]
              ? fontFileName.split('-')[1]
              : fontFileName;
            switch (fontWeight.toLocaleLowerCase()) {
              case 'thin':
                fontWeight = 100;
                break;
              case 'extralight':
                fontWeight = 200;
                break;
              case 'light':
                fontWeight = 300;
                break;
              case 'medium':
                fontWeight = 500;
                break;
              case 'semibold':
                fontWeight = 600;
                break;
              case 'bold':
                fontWeight = 700;
                break;
              case 'extrabold' || 'heavy':
                fontWeight = 800;
                break;
              case 'black':
                fontWeight = 900;
                break;
              default:
                fontWeight = 400;
                break;
            }
            fs.appendFile(
              fontsFile,
              `@font-face{\n\tfont-family: ${fontName};\n\tsrc: url("../fonts/${fontFileName}.woff") format("woff"), url("../fonts/${fontFileName}.woff2") format("woff2");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n\tfont-display: swap;\r}\r\n`,
              cb
            );
            newFileOnly = fontFileName;
          }
        }
      } else {
        console.log(
          '======================================== File: scss/base/fonts.scss already exist, not write new changes. ========================================'
        );
      }
    }
  });

  return gulp.src(paths.srcFolder);
  function cb() {}
};
