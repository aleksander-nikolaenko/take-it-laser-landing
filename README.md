# Project template for [gulp.js](http://gulpjs.com/)

<img width="114px" height="257px" align="right" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png"/>

### What it does

- [gulp-file-include](https://www.npmjs.com/package/gulp-file-include) partials files to one HTML
- [Scss](https://sass-lang.com/) files to CSS
- [ES6+ JavaScript](https://babeljs.io) files to ES5 Javascript through [browserify](http://browserify.org/)
- Uses [BrowserSync](http://www.browsersync.io/) to serve your static files to localhost:1234 and to automatically reload your browser when files change.

  ## Getting things up and running

* Install [Node.js](http://nodejs.org)

```
 git clone git@github.com:aleksander-nikolaenko/gulp-template.git <your project name>
 cd <your project name>
 npm install
 npm run dev
 open http://localhost:1234 in your browser
```

## CLI Commands

- npm install
  - Installs server-side dependencies from npm
- npm run dev
  - Compiles your files, starts watching files for changes, serves static files to port 1234
- npm run build
  - Builds everything
- npm run images
  - Builds images minimaze and convert to avif and webp
- npm run fonts
  - Builds fonts convert to woff and woff2
- npm run sprite
  - Builds svg-icons convert to one sprite file
