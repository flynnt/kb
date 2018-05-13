/**
 * Aggregates SVG icons into an SVG sprite
 *
 * @usage gulp icons
 */
import browserSync from 'browser-sync';
import cheerio from 'gulp-cheerio';
import gulp from 'gulp';
import gutil from 'gulp-util';
import path from 'path';
import rename from 'gulp-rename';
import svgstore from 'gulp-svgstore';
import svgmin from 'gulp-svgmin';

function watchIcons() {
    gulp.watch(`${process.env.DIRECTORY_SRC}/assets/media/icons/**/*`, () => {
        gutil.log('Change in icons directory detected, gerating sprite...');
        generateIcons();
    });
}

function generateIcons() {
    return gulp
        .src(`${process.env.DIRECTORY_SRC}/assets/media/icons/**/*.svg`)
        .pipe(rename({
            prefix: 'icon_',
        }))
        .pipe(svgmin())
        .pipe(svgstore({
            inlineSvg: true,
        }))
        .pipe(cheerio({
            run: $ => {
                $('svg')
                    .addClass('u-isVisuallyHidden')
                    .removeAttr('xmlns');
            },
            parserOptions: { xmlMode: true },
        }))
        .pipe(gulp.dest(`${process.env.DIRECTORY_SRC}/templates/partials/svg/`));
}

export default function icons() {
    if (process.env.WATCH === 'true') {
        watchIcons();
    }

    return generateIcons();
}
