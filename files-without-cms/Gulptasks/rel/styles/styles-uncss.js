
const gulp = require('gulp');
const $    = require('gulp-load-plugins')();


module.exports = function( options ) {

    return function () {
        return gulp.src( options.src )
            .pipe( $.uncss({
                html: [ options.html ]
            }) )
            .pipe( $.debug({ title: 'uncss' }) )            //debug
            .pipe( gulp.dest( options.dest ) );
    };

};