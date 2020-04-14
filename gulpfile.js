const { gulp, src, dest, series, parallel, watch } = require('gulp');

const del = require('del');

const haml = require('gulp-haml');

const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const babel= require('gulp-babel');

const browserSync = require('browser-sync').create();



async function clean(cb) {
  await del('build/');
  cb();
}

function hamltohtml(cb) {
  src('src/index.haml')
    .pipe(haml())
    .pipe(dest('build/'));
  cb();
}

function css(cb) {
  src('src/style.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  }))

  .pipe(dest('build/'));

  cb();
}

function js(cb) {
  // src('src/main.js').pipe(dest('build/'));

  src('src/script.js')
  .pipe(babel({
    presets: ['@babel/env']
  }))  
  .pipe(dest('build/'));
  cb();
}



function watcher(cb) {
  watch('src/index.haml').on('change', series(hamltohtml, browserSync.reload))
  watch('src/style.scss').on('change', series(css, browserSync.reload))
  watch('src/main.js').on('change', series(js, browserSync.reload))
  cb();
}

function server(cb) {
  browserSync.init({
    notify: false,
    open: true,
    server: {
      baseDir: 'build'
    }
  })
  cb();
}

exports.default = series(clean, parallel(hamltohtml,css, js), server, watcher);