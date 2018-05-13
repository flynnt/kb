/**
 * Notify user of happenings with system notifications.
 */

import gulp from 'gulp';
import gulpIf from 'gulp-if';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';

if (process.env.NOTIFY === 'false') {
    process.env.DISABLE_NOTIFIER = true;
}

class Notify {
    get isWatch() {
        return process.env.WATCH === 'true' && process.env.watchStarted === 'true';
    }

    onError(title) {
        return notify.onError({ title, message: '<%= error.message %>' });
    }

    onErrorPipe(title) {
        return plumber({
            errorHandler: this.onError(title),
        });
    }

    success(title, message = ' ') {
        // uses a dummy source file here,
        // because gulp-notify won't run without a pipe
        return gulp
            .src('gulpfile.js')
            .pipe(gulpIf(
                this.isWatch,
                notify({ title, message })
            ));
    }

    successPipe(title, message = ' ') {
        return gulpIf(
            this.isWatch,
            notify({ title, message, onLast: true })
        );
    }

    buildSuccess(title, message = ' ') {
        return gulp
            .src('gulpfile.js')
            .pipe(notify({ title, message }));
    }
}

export default new Notify();
