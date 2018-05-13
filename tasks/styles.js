/**
 * Builds CSS files found in /src/assets/styles
 *
 * @usage gulp styles
 */

import autoprefixer from 'autoprefixer';
import sass from 'gulp-sass';
import browserSync from 'browser-sync';
import cleanCSS from 'gulp-clean-css';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import notify from './notify';
import gutil from 'gulp-util';

const processors = [
    autoprefixer({ browsers: ['>0.25%', 'not ie 11', 'not op_mini all'] }),
];

function watchStyles() {
    gulp.watch(`${process.env.DIRECTORY_SRC}/assets/styles/**/*`, () => {
        gutil.log('Styles: file update detected, rebuilding...');
        buildStyles();
    });
}

function buildStyles() {
    const browser = browserSync.get('local');

    return gulp
        .src(`${process.env.DIRECTORY_SRC}/assets/styles/**/*.scss`)
        .pipe(gulpIf(process.env.SOURCE_MAPS === 'true', sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulpIf(process.env.MINIFY === 'true', cleanCSS({
            mediaMerging: false,
        })))
        .pipe(gulpIf(process.env.SOURCE_MAPS === 'true', sourcemaps.write('./')))
        .pipe(gulp.dest(`${process.env.DIRECTORY_DEST}/assets/styles/`))
        .pipe(browser.reload({ match: '**/*.css', stream: true }));
}

export default function styles() {
    if (process.env.WATCH === 'true') {
        watchStyles();
    }

    return buildStyles();
}
