var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var rimraf = require('gulp-rimraf');

var bases = {
    src: 'src/',
    dist: 'build/'
};

var paths = {
    fonts: ['assets/fonts/*'],
    images: ['assets/img/*'],
    css: ['assets/css/*'],
    html_partials: ['app/**/*.html'],
    php: ['assets/php/*']
};

gulp.task('clean', function() {
     return gulp.src(bases.dist)
        .pipe(rimraf());
});

gulp.task('sass', function () {
    return gulp.src('./src/assets/scss/style.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./src/assets/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('src/**/scss/*.scss', ['sass']);
});

gulp.task('minify', ['sass', 'clean'], function(){
    return gulp.src('./src/index.html')
        .pipe(usemin({
            html: [minifyHtml({ empty: true })],
            js: [uglify()]
        }))
        .pipe(gulp.dest('build'));
});


gulp.task('copy', ['clean'], function() {
    gulp.src(paths.fonts, {cwd: bases.src})
        .pipe(gulp.dest(bases.dist + 'assets/fonts/'));

    gulp.src(paths.images, {cwd: bases.src})
        .pipe(gulp.dest(bases.dist + 'assets/img/'));

    gulp.src(paths.css, {cwd: bases.src})
        .pipe(gulp.dest(bases.dist + 'assets/css/'));

    gulp.src(paths.php, {cwd: bases.src})
        .pipe(gulp.dest(bases.dist + 'assets/php/'));

    gulp.src(paths.html_partials, {cwd: bases.src})
        .pipe(minifyHtml({empty: true}))
        .pipe(gulp.dest(bases.dist + 'app/'));
});

gulp.task('connect', function () {
    connect.server({
        port: 8080,
    });
});

gulp.task('connect-build', function () {
    connect.server({
        root: 'build',
        port: 8000
    });
});

gulp.task('build', ['sass', 'minify', 'copy']);

gulp.task('default', ['connect']);