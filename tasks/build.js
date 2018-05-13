/**
 * Builds all source code in /src, and outputs to /web
 *
 * @usage gulp
 */

import del from 'del';
import gulp from 'gulp';
import gutil from 'gulp-util';
import runSequence from 'run-sequence';
const tasks = ['clean', ['media', 'markup', 'styles', 'scripts', 'vendor']];
if (process.env.LINT === 'true') {
    tasks.unshift('lintScripts', 'lintStyles');
}

function clean() {
    return del(process.env.DIRECTORY_DEST);
}

export default function build(done) {
    return runSequence(...tasks,
        () => {
            const message = process.env.WATCH === 'true' ?
                    'Starting watch...' :
                    'Build complete';
            gutil.log(gutil.colors.white.bgGreen.bold(message));
            process.env.watchStarted = true;
            done();
        });
}

gulp.task('clean', clean);
