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
var flatten = require('gulp-flatten');
var exec = require('child_process').exec;


/*==============================
=            SETUP             =
==============================*/

// Define the bases for src and build folders
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

// VPS URL
var vpsUrl = 'vps135707.vps.ovh.ca';


/*==============================
=            TASKS             =
==============================*/

// Task to compile SASS files into CSS
gulp.task('sass', function () {
    return gulp.src('./src/assets/scss/style.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./src/assets/css'));
});

// Task to add the HTML templates to the Angular template cache
gulp.task('templates', function() {
    gulp.src(paths.html_partials, {cwd: bases.src})
        .pipe(templateCache('app.templates.js', templateCacheOptions))
        .pipe(gulp.dest('src/app'));
});

// Taks to copy required npm libraries in assets/js folder
gulp.task('copy-npm-libs', function() {
    return gulp.src(
      [
        '../node_modules/angular/angular.min.js',
        '../node_modules/angular-*/*.min.js',
        '../node_modules/segment-js/dist/segment.min.js'
      ], {cwd: bases.src})
        .pipe(flatten())
        .pipe(gulp.dest('src/assets/js'));
});

// Task to combine, minify and annotate the index.html JavaScript files, and minify the HTML page
gulp.task('minify', ['copy-npm-libs', 'sass', 'clean'], function(){
    return gulp.src('./src/index.html')
        .pipe(usemin({
            html: [minifyHtml({ empty: true })],
            jsLibs: [ngAnnotate(), uglify()],
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
gulp.task('copy-app-assets', ['clean'], function() {
    gulp.src(paths.fonts, {cwd: bases.src})
        .pipe(gulp.dest(bases.build + 'assets/fonts/'));

    gulp.src(paths.images, {cwd: bases.src})
        .pipe(gulp.dest(bases.build + 'assets/img/'));

    gulp.src(paths.css, {cwd: bases.src})
        .pipe(gulp.dest(bases.build + 'assets/css/'));

    gulp.src(paths.php, {cwd: bases.src})
        .pipe(gulp.dest(bases.build + 'assets/php/'));
});

// Task to copy the Apache .htaccess at the root of the production folder
gulp.task('copy-htaccess', function() {
    gulp.src('apache/.htaccess')
      .pipe(gulp.dest(bases.build));
});

// Task to create a robot.txt file for production (not part of source control)
gulp.task('create-robots-txt', function() {
    exec(`echo $'User-agent: *\nDisallow:' > ${__dirname}/build/robots.txt`);
});

/*==============================
=         WEB SERVERS          =
==============================*/

// Task to start a local server for dev environment
gulp.task('connect-dev', function () {
    connect.server({
        root: 'src',
        port: 8080,
        fallback: 'src/index.html'
    });
});

// Task to start a local server for prod environment
gulp.task('connect-prod', function () {
    connect.server({
        root: 'build',
        port: 8000,
        fallback: 'build/index.html'
    });
});


/*==============================
=          SEQUENCES           =
==============================*/

// Build sequence
gulp.task('build-dev', ['copy-npm-libs', 'sass', 'templates']);

// Build for production sequence
gulp.task('build-prod', ['copy-npm-libs', 'sass', 'templates', 'minify', 'copy-app-assets']);

// Default sequence
gulp.task('default', ['build-dev', 'connect-dev']);


/*===============================
=          DEPLOYMENT           =
================================*/

gulp.task('deploy-prod', function () {
    gulp.start('create-robots-txt');
    gulp.start('copy-htaccess');
    exec(`ssh root@${vpsUrl} 'rm -rf /var/www/html/*'`, function(error) {
        if (error) {
            console.log('Something went wrong. Error: ', error);
        } else {
            console.log('Old build deleted');
        }
    });
    exec(`cd ${__dirname}/`);
    exec(`scp -r ./build/. root@${vpsUrl}:/var/www/html`, function(error) {
        if (error) {
            console.log('Something went wrong. Error: ', error);
        } else {
            console.log('New build copied');
            console.log('-----------');
            console.log('  SUCCESS  ');
            console.log('-----------');
        }
    });
});
