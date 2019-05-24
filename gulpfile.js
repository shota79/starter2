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
const dist = 'dist';
const paths = {
  scss: {
    src: src + '/assets/scss/**/**/*.scss',
    dest: dist + '/assets/css'
  },
  css: {
    src: src + '/assets/css/**/**/*.css',
    dest: dist + '/assets/css'
  },
  scripts: {
    src: src + '/assets/js/**/*.js',
    dest: dist + '/assets/js'
  },
  components: {
    src: src + '/components/**/*.html',
    dest: dist + '/components'
  },
  fonts: {
    src: src + '/assets/fonts/**/*',
    dest: dist + '/assets/fonts'
  },
  pages: {
    src: src + '/pages/**/*.html',
    dest: dist + '/pages'
  },
  index: {
    src: src + '/*.html',
    dest: dist
  },
  images: {
    src: src + '/assets/img/**/*.{jpg, jpeg, png, gif}',
    dest: dist + '/assets/img/'
  }
}

const browserSync = done => {
  bs.init({
    port: 3000,
    open: false,
    server: {
      baseDir: './dist'
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

const scss = () => {
  return gulp.src(paths.scss.src, { sourcemaps: true })
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cleanCSS({
      debug: true
    }))
    .pipe(sourcemaps.write('../maps'))
    .pipe(cache.clear())
    .pipe(gulp.dest(paths.scss.dest))
}

const css = () => {
  return gulp.src([paths.css.src])
    .pipe(cleanCSS({
      debug: true
    }))
    .pipe(cache.clear())
    .pipe(gulp.dest(paths.css.dest))
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

const copyPages = () => {
  return gulp.src(paths.pages.src)
    .pipe(htmlPartial({
      basePath: src + '/components/',
      tagName: 'component',
      variablePrefix: '@@'
    }))
    .pipe(gulp.dest(paths.pages.dest))
    .pipe(cache.clear())
}

const copyIndex = () => {
  return gulp.src(paths.index.src)
    .pipe(htmlPartial({
      basePath: 'src/components/',
      tagName: 'component',
      variablePrefix: '@@'
    }))
    .pipe(gulp.dest(paths.index.dest))
    .pipe(cache.clear())
}
const fonts = () => gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dest))
const clean = () => del(['./dist']);

const watch = () => {
  gulp.watch(paths.css.src, css).on('change', path => browserSyncStream(path));
  gulp.watch(paths.scss.src, scss).on('change', path => browserSyncStream(path));
  gulp.watch(paths.scripts.src, scripts).on('change', path => browserSyncReload(path));
  gulp.watch(paths.components.src, components).on('change', path => browserSyncReload(path));
  gulp.watch(paths.pages.src, copyPages).on('change', path => browserSyncReload(path));
  gulp.watch(paths.index.src, copyIndex).on('change', path => browserSyncReload(path));
  
}

// css only
const serve = gulp.series(clean, gulp.parallel( browserSync, css, scripts, watch, fonts, copyPages, copyIndex));
const build = gulp.series(clean, gulp.parallel( css, scripts, copyPages, copyIndex, fonts ));

// scss only
// const serve = gulp.series(clean, gulp.parallel( browserSync, scss, scripts, watch, fonts, copyPages, copyIndex));
// const build = gulp.series(clean, gulp.parallel( scss, scripts, copyPages, copyIndex, fonts ));

// css & scss
// const serve = gulp.series(clean, gulp.parallel( browserSync, css, scss, scripts, watch, fonts, copyPages, copyIndex));
// const build = gulp.series(clean, gulp.parallel( css, scss, scripts, copyPages, copyIndex, fonts ));

gulp.task('default', serve);
gulp.task('build', build);
gulp.task('clean', clean);