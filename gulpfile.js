const {src, dest, watch, series, parallel} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const pug = require('gulp-pug')
const connect = require('gulp-connect')
const minify = require('gulp-minify')

const appPath = {
    sass: './app/sass/**/*.sass',
    pug: './app/index.pug',
    js: './app/js/**/*.js',
    img: './app/img/**/*.*',
    fonts: './app/fonts/**/*.*',
}

const destPath = {
    css: './dest/css',
    html: './dest',
    img: './dest/img',
    fonts: './dest/fonts',
    js: './dest/js'
}

const jsPath = [
    './app/js/script.js'
]

function buildStyles() {
    return src(appPath.sass)
        .pipe(sass({
            // outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(dest(destPath.css))
        .pipe(connect.reload());
}

function buildHtml() {
    return src(appPath.pug)
        .pipe(pug({}))
        .pipe(dest(destPath.html))
        .pipe(connect.reload());
}

function buildJs() {
    return src(jsPath)
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
        }))
        .pipe(dest(destPath.js))
        .pipe(connect.reload());
}

function startLocalServer() {
    connect.server({
        root: 'dest',
        port: 7070,
        livereload: true
    })
}

function copyImages() {
    return src(appPath.img)
        .pipe(dest(destPath.img))
}

function copyFonts() {
    return src(appPath.fonts)
        .pipe(dest(destPath.fonts))
}

function watchCode() {
    watch(appPath.sass, buildStyles)
    watch(appPath.pug, buildHtml)
    watch(appPath.js, buildJs)
}

exports.build = series(buildStyles, buildHtml, buildJs, copyFonts, copyImages)

exports.default = series(buildStyles, buildHtml, buildJs, copyFonts, copyImages, parallel(startLocalServer, watchCode))
