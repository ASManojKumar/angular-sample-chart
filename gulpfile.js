require('es6-promise').polyfill();

var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var connect = require('gulp-connect');
var stylish = require('jshint-stylish');
var minimist = require('minimist');
var ngConfig = require('gulp-ng-config');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var _ = require('underscore');

var knownOptions = {
    string: 'env, showApps',
    default: { env: 'localhost', showApps: 'true' }
};

var options = minimist(process.argv.slice(2), knownOptions);

var scriptRoot = 'app';
var scriptFolder = scriptRoot + '/**/*.js';

gulp.task('scripts', function() {
    return gulp.src(scriptFolder)
        .pipe(plumber())

    .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('vendorCss', function() {
    return gulp.src([
            'bower_components/bootstrap/dist/css/*.css',
            'css/*.css'
        ])
        .pipe(plumber())
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('vendorScripts', function() {
    return gulp.src([
            'bower_components/**/angular.min.js',
            'bower_components/**/angular-route.min.js',
            'bower_components/**/bootstrap/js/bootstrap.js',
            'bower_components/**/angular-ui-router.min.js',
            'bower_components/**/lodash.min.js',
            'bower_components/**/Chart.bundle.js',
            'bower_components/**/Chart.Zoom.min.js'
        ])
        .pipe(plumber())
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('templates', function() {
    gulp.src('index.html').pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts', 'templates'], function() {
    gulp.watch(scriptFolder, ['scripts']);
    gulp.watch([
        'index.html'
    ], ['templates']);
});

gulp.task('server', function() {
    connect.server({
        root: 'dist',
        port: 8000,
        fallback: 'dist/index.html'
    });
});

gulp.task('clean', function() {
    return gulp.src('dist', { read: false })
        .pipe(clean());
});

gulp.task('default', function() {
    gulp.start('templates');
    gulp.start('vendorCss');
    gulp.start('scripts');
    gulp.start('vendorScripts');
    gulp.start('server');
    gulp.start('watch');
});
