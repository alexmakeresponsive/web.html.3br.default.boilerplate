
const gulp = require('gulp');
const $    = require('gulp-load-plugins')();


module.exports = function( options ) {

    return function () {
        return gulp.src( options.src )
                   .pipe( gulp.dest( options.dest1 ) )
                   .pipe( gulp.dest( options.dest2 ) );
    };

};