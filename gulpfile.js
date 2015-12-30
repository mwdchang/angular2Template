var gulp = require('gulp');

var PATHS = {
    src: 'app/**/*.ts',
    sass: 'styles/**/*.scss',
    view: 'app/views/*.html'
};

gulp.task('clean', function (done) {
    var del = require('del');
    del(['dist'], done);
});


gulp.task('sass', function() {
    var sass = require('gulp-sass');
    var path = require('path');

    return gulp.src(PATHS.sass)
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('usemin', function() {
   var usemin = require('gulp-usemin');
   return gulp.src('index.html')
     .pipe(usemin())
     .pipe(gulp.dest('dist'));
});

gulp.task('ts2js', function () {
    var typescript = require('gulp-typescript');
    var tscConfig = require('./tsconfig.json');

    var tsResult = gulp
        .src(PATHS.src)
        .pipe(typescript(tscConfig.compilerOptions));

    return tsResult.js.pipe(gulp.dest('dist'));
});


gulp.task('copy', function() {
   return gulp
     .src(PATHS.view)
     .pipe(gulp.dest('dist/views'));
});


gulp.task('play', ['ts2js', 'sass', 'copy', 'usemin'], function () {
    var http = require('http');
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var open = require('open');

    var port = 9000, app;
    gulp.watch(PATHS.src, ['ts2js']);
    gulp.watch(PATHS.sass, ['sass']);
    gulp.watch(PATHS.view, ['copy']);


    // app = connect().use(serveStatic(__dirname));
    app = connect().use(serveStatic('./dist'));
    http.createServer(app).listen(port, function () {
        console.log('listening on port ... ', port);
        open('http://localhost:' + port);
    });
});

gulp.task('default', ['play']);
