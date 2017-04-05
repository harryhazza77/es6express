import gulp from "gulp";
import eslint from "gulp-eslint";
import flow from "gulp-flowtype";

gulp.task("lint", () => {
    return gulp.src([
        "./src/**/*.js",
        "./tests/**/*.js"
    ])
    .pipe(flow())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
