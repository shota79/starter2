'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      minify = require('gulp-minify'),
      bs = require('browser-sync').create(),
      cleanCSS = require('gulp-clean-css'),
      cache = require('gulp-cache'),
      sourcemaps = require('gulp-sourcemaps'),
      htmlPartial = require('gulp-html-partial'),
      del = require('del');

const src = 'src';
const paths = {
  styles: {
    src: src + '/scss/**/**/*.scss',
    dest: 'assets/css'
  },
  scripts: {
    src: src + '/js/**/*.js',
    dest: 'assets/js'
  },
  components: {
    src: src + '/components/*.html',
    dest: 'assets/components'
  },
  fonts: {
    src: src + '/fonts/**/*',
    dest: 'assets/fonts'
  },
  index: {
    src: src + '/*.html',
    dest: 'assets'
  },
  images: {
    src: src + '/images/**/*.{jpg, jpeg, png, gif}',
    dest: 'assets/images/'
  }
}

const browserSync = done => {
  bs.init({
    port: 3000,
    open: false,
    server: {
      baseDir: './assets'
    }
  })
}

const browserSyncStream = path => {
  cache.clearAll();
  return gulp.src(path).pipe(bs.stream());
}

const browserSyncReload = path => {
  cache.clearAll();
  return gulp.src(path).pipe(bs.reload({stream: true}));
}

const styles = () => {
  return gulp.src(paths.styles.src, { sourcemaps: true })
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cleanCSS({
      debug: true
    }))
    .pipe(sourcemaps.write('../maps'))
    .pipe(cache.clear())
    .pipe(gulp.dest(paths.styles.dest))
}

const scripts = () => {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(minify())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(cache.clear())
}

const components = () => {
  return gulp.src([paths.components.src])
    .pipe(gulp.dest(paths.components.dest))
    .pipe(cache.clear())
}

const copyIndex = () => {
  return gulp.src(paths.index.src)
    .pipe(htmlPartial({
      basePath: 'src/components/'
    }))
    .pipe(gulp.dest(paths.index.dest))
    .pipe(cache.clear())
}
const fonts = () => gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dest))
const clean = () => del(['./assets']);

const watch = () => {
  gulp.watch(paths.styles.src, styles).on('change', path => browserSyncStream(path));
  gulp.watch(paths.scripts.src, scripts).on('change', path => browserSyncReload(path));
  gulp.watch(paths.components.src, components).on('change', path => browserSyncReload(path));
  gulp.watch(paths.index.src, copyIndex).on('change', path => browserSyncReload(path));
}

const serve = gulp.series(clean, gulp.parallel( browserSync, styles, scripts, watch, fonts, copyIndex));
const build = gulp.series(clean, gulp.parallel( styles, scripts, copyIndex, fonts ));

gulp.task('default', serve);
gulp.task('build', build);
gulp.task('clean', clean);