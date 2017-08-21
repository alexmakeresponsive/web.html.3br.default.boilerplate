
const gulp         = require('gulp');
const $            = require('gulp-load-plugins')();
const htmlbeautify = require('gulp-html-beautify');


module.exports = function( options ) {

    return function () {
        gulp.src( options.src )
            .pipe( htmlbeautify({
                indentSize: 2
            }) )
            .pipe( $.debug({ title: 'htmlbeautify' }) )             //debug
            .pipe( gulp.dest( options.dest ) );   
    };

};