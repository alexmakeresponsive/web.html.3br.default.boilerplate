
const gulp = require('gulp');
const $    = require('gulp-load-plugins')();


module.exports = function( options ) {

    return function () {
        return gulp.src( options.src )
            .pipe( $.sourcemaps.init() )                             //sourcemaps

            .pipe( $.uglify() )
            .pipe( $.debug({ title: 'uglify' }) )            //debug
            .pipe( $.rename({
                suffix: ".min"
            }))
            .pipe( $.debug({ title: 'rename' }) )             //debug

            .pipe( $.sourcemaps.write('.') )                         //sourcemaps
            .pipe( $.debug({ title: 'sourcemaps' }) )             //debug

            .pipe( gulp.dest( options.dest1 ) )
            .pipe( gulp.dest( options.dest2 ) );
    };

};