
const gulp           = require('gulp');
const $              = require('gulp-load-plugins')();
const imageOptimizer = require('gulp-image');


module.exports = function( options ) {

    return function () {
        gulp.src( options.src )
            .pipe( imageOptimizer() )
            .pipe( $.debug({ title: 'imageOptimizer' }) )             //debug
            .pipe( gulp.dest( options.dest ));
    };

};