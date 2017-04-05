import gulp from"gulp";
import gulpNsp from"gulp-nsp";

gulp.task("nsp", done => {
    gulpNsp({ package: __dirname + "/../package.json", stopOnError: false }, done);
});
