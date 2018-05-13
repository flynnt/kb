/**
 * Lints all JavaScript files for syntax issues in /src/assets/scripts
 *
 * @usage gulp lintStyles
 */

import stylelint from 'gulp-stylelint';
import gulp from 'gulp';
import gutil from 'gulp-util';

export default function lintStyles() {
    gutil.log(gutil.colors.white.bgMagenta('Linting SCSS/CSS files.'));
    return gulp
        .src(`${process.env.DIRECTORY_SRC}/assets/styles/**/*.scss`)
        .pipe(stylelint({
            failAfterError: true,
            reporters: [
                { formatter: 'string', console: true },
            ],
        })
            .on('error',
                () => {
                    gutil.log(
                        gutil.colors.white.bgRed.bold('SCSS/CSS lint issues found - build exiting.'
                        ));
                }));
}
