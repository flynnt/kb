/**
 * Builds JavaScript files found in /src/assets/scripts
 * Uses watchify for fast incremental builds
 *
 * @usage gulp scripts
 */

import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import browserSync from 'browser-sync';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import gutil from 'gulp-util';
import notify from './notify';
import pkg from './../package.json';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import watchify from 'watchify';

function onUpdate(bundler) {
    const browser = browserSync.get('local');

    return bundler
        .bundle()
        .on('error', error => { gutil.log(error); })
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulpIf(process.env.SOURCE_MAPS  === 'true', sourcemaps.init({ loadMaps: true })))
        .pipe(gulpIf(process.env.MINIFY === 'true', uglify()))
        .pipe(gulpIf(process.env.SOURCE_MAPS === 'true', sourcemaps.write('./')))
        .pipe(gulp.dest(`${process.env.DIRECTORY_DEST}/assets/scripts/`))
        .pipe(browser.reload({ stream: true }));
}

export default function scripts() {
    const plugins = [];
    const vendorArray = [...Object.keys(pkg.browser), ...Object.keys(pkg.dependencies)];

    if (process.env.WATCH === 'true') {
        plugins.push(watchify);
    }

    const bundler = browserify({
        cache: {},
        packageCache: {},
        plugin: plugins,
        debug: process.env.SOURCE_MAPS === 'true',
        entries: [`${process.env.DIRECTORY_SRC}/assets/scripts/main.js`],
        paths: [`./${process.env.DIRECTORY_SRC}/assets/scripts`],
    })
    .external(vendorArray)
    .transform('nunjucksify', { extension: ['.nunjucks'] })
    .transform('babelify', { extensions: ['.js'] });

    bundler.on('update', () => {
        console.log('Scripts: file update detected, rebuilding...');
        onUpdate(bundler);
    });
    bundler.on('log', message => { gutil.log('Scripts complete'); });

    return onUpdate(bundler);
}
