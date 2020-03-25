
const gulp = require('gulp');
const $    = require('gulp-load-plugins')();


module.exports = function( options ) {

    return function () {
        return gulp.src( options.src, { base: options.base } )
            .pipe( $.sourcemaps.init() )                          //sourcemaps

            // .pipe( debug({ title: 'src' }) )                //debug
            .pipe( $.concat( 'styles.scss' ) )
            .pipe( $.debug({ title: 'concat' }) )             //debug
            .pipe( $.sass() )
            .pipe( $.debug({ title: 'sass' }) )               //debug
            .pipe( $.autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }) )
            .pipe( $.debug({ title: 'autoprefixer' }) )       //debug

            .pipe( $.sourcemaps.write('.') )                         //sourcemaps
            .pipe( $.debug({ title: 'sourcemaps' }) )             //debug

            .pipe( gulp.dest( options.dest ) );
    };

};