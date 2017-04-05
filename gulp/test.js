import env from "gulp-env";
import gulp from "gulp";
import istanbul from "gulp-babel-istanbul";
import mocha from "gulp-mocha";
import runSequence from "run-sequence";
import spawnMocha from "gulp-spawn-mocha";

gulp.task("test", done => {
    runSequence("test:server", "test:coverage", done);
});

gulp.task("test:coverage", done => {
    env({
        vars: {
            buildMode: "test"
        }
    });

    gulp.src("./src/**/*.js")
        .pipe(istanbul({
            includeUntested: true
        }))
        .pipe(istanbul.hookRequire())
        .on("finish", () => {
            gulp.src("./tests/**/*.js")
                .pipe(mocha({
                    compilers: ["js:babel-core/register"],
                    reporter: () => {}
                }))
                .pipe(istanbul.writeReports({
                    reporters: process.env.CI ? ["lcov"] : ["lcov", "text-summary"]
                }))
                .on("end", () => {
                    done();
                    process.exit();
                })
                .on("error", err => {
                    done(err);
                    process.exit(1);
                });
        });
});

gulp.task("test:server", () => {
    return gulp.src([
        "./tests/**/*.js"
    ])
        .pipe(spawnMocha({
            compilers: ["js:babel-core/register, js:babel-polyfill"],
            env: { buildMode: "test" },
            reporter: process.env.CI ? "mocha-junit-reporter" : "nyan",
            reporterOptions: "mochaFile=./faoCircle/serverTestResults.xml"
        }));
});