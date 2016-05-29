var gulp = require('gulp');
var tasks = ['concat','uglify','ng-annotate','babel','rename'];
tasks.forEach((task) => {
    gulp[task] = require(`gulp-${ task }`);
});

gulp.task('build',() => {
    gulp.src(['src/*.module.js','src/**/*.js'])
        .pipe(gulp.concat('angular-off-click.js'))
        .pipe(gulp.babel({
            presets: ['es2015']
        }))
        .pipe(gulp['ng-annotate']())
        .pipe(gulp.dest('dist'))
        .pipe(gulp.rename('angular-off-click.min.js'))
        .pipe(gulp.uglify())
        .pipe(gulp.dest('dist'));
});