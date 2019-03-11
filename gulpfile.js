// #1 import van toegevoegde packeges (via npm of yarn)

//basis packages
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const plumber = require('gulp-plumber');

// Style packages
const sass = require('gulp-sass'); //ook node-sass nodig
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// HTML packages
const htmlmin = require('gulp-htmlmin')

// js packages
const webpack = require('webpack');
const webpackconfig = require('./webpack.config.js');
const webpackstream = require('webpack-stream');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');


//ook nog
// babel-loader

// #2 De Tasks / watchers zelf die we aanmaken

// a We willen een development server opzetten
function browserSync(done) {
    browsersync.init({
        server:
        {
            baseDir: './dist/'
        },
        port: 3000
    });
    done();
}


function browserSyncReload(done) {
    browsersync.reload();
    done();
}
// b html moet geminified naar de dist-map gezet worden
function minifyHTML() {
    return gulp
        .src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist/'));
}

// c Js willen we samenvoegen, minifien en compatibel maken
function scriptsLint() {
    return gulp
        .src(['./src/scripts/**/*'])
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

function scripts() {
    return gulp
        .src(['./src/scripts/lib/*.js', './src/scripts/*.js'])
        .pipe(plumber())
        .pipe(concat('app.bundle.js'))
        // .pipe(webpackstream(webpackconfig, webpack))
        .pipe(gulp.dest('./dist/scripts/'))
        .pipe(browsersync.stream());
}

// d css via scss

function style() {
    return gulp
        .src('./src/styles/screen.scss')
        .pipe(sass())
        .pipe(rename({ suffix: '.min' }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .on('error', sass.logError)
        .pipe(gulp.dest('./dist/styles/'));
}
// e watchen van veranderingen 
const serve = gulp.parallel(watchFiles, browserSync); // complexere combinatie van tasks...

function watchFiles() {
    gulp.watch(['./src/scripts/**/*.js'], gulp.series(scripts, browserSyncReload));
    gulp.watch(['./src/**/*.html'], gulp.series(minifyHTML, browserSyncReload));
    gulp.watch('./src/styles/**/*.scss', gulp.series(style, browserSyncReload));
}

// #3 export van onze eigen tasks (functions)
//ps: dan kunnen we ze gebruiken via de command line ;-)

exports.serve = serve;
exports.scripts = scripts;