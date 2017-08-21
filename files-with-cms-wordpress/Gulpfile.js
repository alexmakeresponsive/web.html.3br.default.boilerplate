'use strict';




/**
 * Constants
 * */

/*common consts*/
const gulp          = require('gulp');
const debug         = require('gulp-debug');
const del           = require('del');
const concat        = require('gulp-concat');
const rename        = require("gulp-rename");
const shell         = require('gulp-shell');
const sourcemaps    = require('gulp-sourcemaps');
const browserSync   = require('browser-sync').create();
const runSequence   = require('run-sequence');
/*common consts*/

/*styles consts*/
const sass          = require('gulp-sass');
const autoprefixer  = require('gulp-autoprefixer');
const uncss         = require('gulp-uncss');
const cssnano       = require('gulp-cssnano');
/*styles consts*/

/*javascript consts*/
const uglify        = require('gulp-uglify');
/*javascript consts*/

/*html consts*/
const htmlbeautify  = require('gulp-html-beautify');
/*html consts*/

/**
 * Constants
 * */



gulp.task( 'dev:styles:clean', function() {
    return del(
        'wp-content/themes/theme/resources/template/**/*.*'
    );

});


gulp.task( 'dev:styles:copy', function() {
    gulp.src( '../files-without-cms/build_ignore/resources/**/*.*' )
        .pipe( debug({ title: 'dev-styles-copy' }) )             //debug
        .pipe( gulp.dest( 'wp-content/themes/theme/resources/template' ) )
});


gulp.task( 'dev', function() {
    runSequence(
        'dev:styles:clean',
        'dev:styles:copy'
    );
});