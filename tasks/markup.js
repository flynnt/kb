/**
 * Builds HTML markup found in /src/assets/
 *
 * @usage gulp markup
 */

/* eslint-disable camelcase, no-param-reassign */
import browserSync from 'browser-sync';
import gulp from 'gulp';
import gutil from 'gulp-util';
import nunjucksRender from 'gulp-nunjucks-render';
import pkg from './../package.json';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import runSequence from 'run-sequence';
const tasks = ['buildMarkup'];

function watchMarkup() {
    gulp.watch(`${process.env.DIRECTORY_SRC}/**/*.{nunjucks,html}`, () => {
        gutil.log('Markup: file update detected, rebuilding...');
        return runSequence(...tasks);
    });
}

function buildMarkup() {
    const browser = browserSync.get('local');

    return gulp
        .src([
            `${process.env.DIRECTORY_SRC}/**/*.nunjucks`,
            `!${process.env.DIRECTORY_SRC}/templates/**`,
            `!${process.env.DIRECTORY_SRC}/assets/vendor/**`,
        ])
        .pipe(nunjucksRender({
            path: process.env.DIRECTORY_SRC,
            data: {
                baseURL: process.env.BASE_URL,
                version: pkg.version,
                date: new Date().toISOString(),
                env: process.env.NODE_ENV,
            },
        }))
        .pipe(rename(path => { path.extname = '.html'; }))
        .pipe(gulp.dest(process.env.DIRECTORY_DEST))
        .pipe(browser.reload({ stream: true }));
}

export default function markup(done) {
    if (process.env.WATCH === 'true') {
        watchMarkup();
    }

    return runSequence(...tasks, () => {
        done();
    });
}

gulp.task('buildMarkup', buildMarkup);
