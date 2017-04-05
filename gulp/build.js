import gulp from "gulp";
import gulpbabel from "gulp-babel";

gulp.task("build", ["build:server"]);

gulp.task("build:server", ["build:server:precompile"]);

gulp.task("build:server:precompile", () => {
    return gulp.src("src/**/*.js")
        .pipe(gulpbabel())
        .pipe(gulp.dest("./dist"));
});