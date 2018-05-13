/**
 * Builds static files found in /src/assets/media
 *
 * @usage gulp media
 */

import browserSync from 'browser-sync';
import gulp from 'gulp';
import notify from './notify';

function watchMedia() {
    gulp.watch([
        `${process.env.DIRECTORY_SRC}/assets/media/**/*`,
        `!${process.env.DIRECTORY_SRC}/assets/media/icons`,
        `!${process.env.DIRECTORY_SRC}/assets/media/icons/**`,
    ], () => {
        console.log('Media: file update detected, rebuilding...');
        buildMedia();
    });
}

function buildMedia() {
    const browser = browserSync.get('local');

    return gulp
        .src([
            `${process.env.DIRECTORY_SRC}/assets/media/**/*`,
            `!${process.env.DIRECTORY_SRC}/assets/media/icons`,
            `!${process.env.DIRECTORY_SRC}/assets/media/icons/**`,
        ], { base: process.env.DIRECTORY_SRC })
        .pipe(notify.onErrorPipe('Media error'))
        .pipe(gulp.dest(process.env.DIRECTORY_DEST))
        .pipe(notify.successPipe('Media complete'))
        .pipe(browser.reload({ match: '**/*.{png,gif,jpg}', stream: true }));
}

export default function media() {
    if (process.env.WATCH === 'true') {
        watchMedia();
    }

    return buildMedia();
}
