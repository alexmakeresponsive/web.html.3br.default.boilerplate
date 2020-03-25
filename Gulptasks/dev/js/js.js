
const gulp = require('gulp');
const $    = require('gulp-load-plugins')();


module.exports = function( options ) {

    return function () {
        return gulp.src( [
                options.src1,
                options.src2
            ]
        )
            .pipe( $.sourcemaps.init() )                          //sourcemaps

            // .pipe( debug({ title: 'src' }) )             //debug
            .pipe( $.concat( 'scripts.js' ) )
            .pipe( $.debug({ title: 'concat' }) )             //debug

            .pipe( $.sourcemaps.write('.') )                         //sourcemaps
            .pipe( $.debug({ title: 'sourcemaps' }) )             //debug

            .pipe( gulp.dest( options.dest ) );
    };

};