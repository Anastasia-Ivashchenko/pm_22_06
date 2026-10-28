const { src, dest, watch, series, parallel } = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename'); // Додано для перейменування у index.min.css
const browserSync = require('browser-sync').create();

// Таски для Bootstrap (Лабораторна №2)
function bootstrapCss() {
  return src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(dest('dist/css'));
}

function bootstrapJs() {
  return src('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
    .pipe(dest('dist/js'));
}

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

// 2. Компiляція SCSS у CSS (Лабораторна №3: беремо main.scss і робимо index.min.css)
function styles() {
  return src('src/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(rename('index.min.css')) // Обов'язкова вимога ЛР3
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
  return src('src/imgs/**/*', { encoding: false })
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
  watch(['src/scss/**/*.scss'], styles); // Стежить за будь-якими змінами в SCSS файлах
  watch(['src/js/**/*.js'], scripts);
  watch(['src/imgs/**/*'], images);
}

// Експорт тасків
exports.bootstrapCss = bootstrapCss;
exports.bootstrapJs = bootstrapJs;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.watch = watching;

// Основна таска за замовчуванням
exports.default = series(
  parallel(bootstrapCss, bootstrapJs),
  parallel(html, styles, scripts, images),
  parallel(server, watching)
);