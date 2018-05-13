/**
 * Lints all JavaScript files for syntax issues in /src/assets/scripts
 *
 * @usage gulp lint
 */

import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gutil from 'gulp-util';

export default function lintScripts() {
    gutil.log(gutil.colors.white.bgMagenta('Linting JS files.'));
    return gulp
        .src([`${process.env.DIRECTORY_SRC}/assets/scripts/**/*.js`])
        .pipe(eslint())
        .pipe(eslint.format('table'))
        .pipe(eslint.failAfterError())
        .on('error',
        () => {
            gutil.log(gutil.colors.white.bgRed.bold('JS lint issues found - build exiting.'));
        });
}
