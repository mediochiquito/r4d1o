var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var exec = require('gulp-exec');
var run = require('gulp-run');

gulp.task('tarea-css', function() {

    return gulp.src('./www/css/**/*.css')
    .pipe( cleanCSS())
    .pipe(concat('all.css'))
    .pipe(autoprefixer({
          browsers: ['> 1%', 'Last 2 versions', 'IE 8'],
          cascade: false
    }))
    .pipe(gulp.dest('./www/dist'));

});


gulp.task('tarea-js', ["cordova-prepare"],  function() {


  return gulp.src(['./www/js/libs/**/*.js' , './www/js/com/**/*.js',  './www/js/com/app.js', './www/js/index.js', ])

      // .pipe(sourcemaps.init())
      //.pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(concat('all.js'))

      //.pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./www/dist/'));
});


gulp.task('copiar-release-android', function() {

    return gulp.src('./certs/release-signing.properties').pipe(gulp.dest('./platforms/android/'));

});




gulp.task("cordova-prepare", ['copiar-release-android'],  function() {
    run('cordova prepare ios').exec()
        .pipe(gulp.dest('output'))

    run('cordova prepare android').exec()
        .pipe(gulp.dest('output'))



});


gulp.task("cordova-platform-rm-ios",  function() {
    run('cordova platform remove ios').exec()
        .pipe(gulp.dest('output'))
});

gulp.task("cordova-platform-add-ios",  function() {
    run('cordova platform add ios').exec()
        .pipe(gulp.dest('output'))
});


gulp.task('watch', ['tarea-css', 'tarea-js'], function () {

    gulp.watch('./www/css/**/*.css', ['tarea-css']);
    gulp.watch('./www/js/**/*.js', ['tarea-js']);
    gulp.watch(['./config.xml', './www/**/*'], ["cordova-prepare"]);

});
