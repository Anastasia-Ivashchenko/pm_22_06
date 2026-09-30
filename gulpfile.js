const { src, dest, watch, series, parallel } = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

// 1. Обробка HTML
function html() {
  return src('src/*.html')
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

// 2. Компіляція SCSS у CSS з мініфікацією
function styles() {
  return src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

// 3. Обробка JS (об'єднання та мініфікація)
function scripts() {
  return src('src/js/**/*.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

// 4. Оптимізація зображень
function images() {
  return src('src/imgs/**/*' , {encoding: false})
    .pipe(imagemin())
    .pipe(dest('dist/imgs'))
    .pipe(browserSync.stream());
}

// 5. Автоматична синхронізація з браузером
function server() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
}

// 6. Створення Watcher (відслідковування змін)
function watching() {
  watch(['src/*.html', 'src/app/**/*.html'], html);
  watch(['src/scss/**/*.scss'], styles);
  watch(['src/js/**/*.js'], scripts);
  watch(['src/imgs/**/*'], images);
}

// Експорт тасків
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.watch = watching;

// Основна таска за замовчуванням (npm start / gulp)
exports.default = parallel(html, styles, scripts, images, server, watching);