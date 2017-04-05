import gulp from "gulp";
import server from "gulp-develop-server";

gulp.task("start", () => {
    server.listen({
        env: { buildMode: "development" },
        path: "src/boot.js"
    });
});

gulp.task("restart", done => {
    server.restart(done);
});
