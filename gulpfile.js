var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var rimraf = require('gulp-rimraf');
var ngAnnotate = require('gulp-ng-annotate');
var replace = require('gulp-replace-path');
var templateCache = require('gulp-angular-templatecache');


/*==============================
=            SETUP             =
==============================*/

// Define the bases for dev (/src) and prod (/build) environment
var bases = {
    src: 'src/',
    build: 'build/'
};

// Define the path of the differents assets
var paths = {
    fonts: ['assets/fonts/*'],
    images: ['assets/img/*'],
    css: ['assets/css/*'],
    html_partials: ['app/**/*.html'],
    php: ['assets/php/*']
};

// Define the configuration object for the template cache
var templateCacheOptions = {
  root: "app/",
  module: "app.templates",
  standalone: true
};


/*==============================
=            TASKS             =
==============================*/

// Task to compile SASS files into CSS
gulp.task('sass', function () {
    return gulp.src('./src/assets/scss/style.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./src/assets/css'));
});

// Tasks to add the HTML templates to the Angular template cache for dev and prod
gulp.task('templates-dev', function() {
    gulp.src(paths.html_partials, {cwd: bases.src})
        .pipe(templateCache('app.templates.js', templateCacheOptions))
        .pipe(gulp.dest('src/app'));
});

gulp.task('templates-prod', function() {
    gulp.src(paths.html_partials, {cwd: bases.src})
        .pipe(replace(/\/src\/assets\/img\//g, '/assets/img/'))
        .pipe(templateCache('app.templates.js', templateCacheOptions))
        .pipe(gulp.dest('src/app'));
});

// Task to combine, minify and annotate the index.html JavaScript files, and minify the HTML page
gulp.task('minify', ['sass', 'clean'], function(){
    return gulp.src('./src/index.html')
        .pipe(usemin({
            html: [minifyHtml({ empty: true })],
            jsLibs: [uglify()],
            jsApp: [ngAnnotate(), uglify()]
        }))
        .pipe(gulp.dest('build'));
});

// Task to delete the /build folder
gulp.task('clean', function() {
     return gulp.src(bases.build)
        .pipe(rimraf());
});

// Task to copy the assets to the production folder
gulp.task('copy', ['clean'], function() {
    gulp.src(paths.fonts, {cwd: bases.src})
        .pipe(gulp.dest(bases.build + 'assets/fonts/'));

    gulp.src(paths.images, {cwd: bases.src})
        .pipe(gulp.dest(bases.build + 'assets/img/'));

    gulp.src(paths.css, {cwd: bases.src})
        .pipe(gulp.dest(bases.build + 'assets/css/'));

    gulp.src(paths.php, {cwd: bases.src})
        .pipe(gulp.dest(bases.build + 'assets/php/'));
});


/*==============================
=         WEB SERVERS          =
==============================*/

// Task to start a local server for dev environment
gulp.task('connect-dev', function () {
    connect.server({
        port: 8080
    });
});

// Task to start a local server for prod environment
gulp.task('connect-prod', function () {
    connect.server({
        root: 'build',
        port: 8000
    });
});


/*==============================
=          SEQUENCES           =
==============================*/

// Build sequence
gulp.task('build', ['sass', 'templates-dev']);

// Deploy sequence
gulp.task('deploy', ['sass', 'templates-prod', 'minify', 'copy']);

// Default sequence
gulp.task('default', ['build', 'connect-dev']);
