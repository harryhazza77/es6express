/*eslint no-console:0*/

import gulp from "gulp";
import watch from "gulp-watch";
import runSequence from "run-sequence";

gulp.task("watch", ["watch:server", "watch:test"]);
gulp.task("watch:server", ["watch:server:js"]);
gulp.task("watch:test", ["watch:test:server"]);

gulp.task("watch:server:all:js:lint", () => {
    return watch([
        "./src/**/*.js",
        "./tests/**/*.js"
    ], () => {
        runSequence("lint");
    })
        .on("change", e => {
            console.log("Js change detected.");
            console.log("Type: " + e.type);
            console.log("Path: " + e.path);
            console.log("Running lint");
        });
});

gulp.task("watch:server:js", () => {
    return watch([
        "./src/**/*.js",
    ], () => {
        runSequence("lint", "test:server", "build:server:precompile", "restart");
    })
        .on("change", e => {
            console.log("Js change detected.");
            console.log("Type: " + e.type);
            console.log("Path: " + e.path);
            console.log("Running lint, test:server");
        });
});

gulp.task("watch:test:server", () => {
    return watch([
        "./tests/**/*.js"
    ], () => {
        runSequence("lint", "test:server");
    })
        .on("change", e => {
            console.log("Js change detected.");
            console.log("Type: " + e.type);
            console.log("Path: " + e.path);
            console.log("Running lint & test:server.");
        });
});