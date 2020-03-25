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

/*assets consts*/
const gulpImagemin = require('gulp-imagemin');
/*assets consts*/

/*deploy const*/
const rsync = require('gulp-rsync');
/*deploy const*/

/**
 * Constants
 * */




function lazyRequireTask( taskName, path, options ) {
    options = options || {};
    options.taskName = taskName;

    gulp.task( taskName, function( callback ) {
        var task = require( path ).call( this, options );

        return task( callback );
    } );
}




/**
 * Styles tasks
 * */

lazyRequireTask( 'dev:styles', './Gulptasks/dev/styles/styles', {
    src:  'source/resources/template/styles/scss/divided/**/*.scss',
    base: 'source/resources/template/styles/scss',
    dest: 'source/resources/template/styles/css'
} );

lazyRequireTask( 'dev:styles:clean', './Gulptasks/dev/styles/styles-clean', {
    src:  'source/resources/template/styles/css/*.*'
} );


lazyRequireTask( 'rel:styles', './Gulptasks/rel/styles/styles', {
    src:    'source/resources/template/styles/css/*.*',
    dest1:  'build/resources/template/styles',
    dest2:  'build_ignore/resources/styles'
} );

lazyRequireTask( 'rel:styles:clean', './Gulptasks/rel/styles/styles-clean', {
    src1:  'build/resources/template/styles/*.*',
    src2:  'build_ignore/resources/styles/*.*'
} );

lazyRequireTask( 'rel:styles:uncss', './Gulptasks/rel/styles/styles-uncss', {
    src:  'build/resources/template/styles/styles.css',
    html: 'build/**/*.html',
    dest: 'build/resources/template/styles'
} );

lazyRequireTask( 'rel:styles:nano', './Gulptasks/rel/styles/styles-nano', {
    src:   'build/resources/template/styles/styles.css',
    dest1: 'build/resources/template/styles',
    dest2: 'build_ignore/resources/styles'
} );

/**
 * Styles tasks
 * */




/**
 * Javascript tasks
 * */

lazyRequireTask( 'dev:js', './Gulptasks/dev/js/js', {
    src1:  'source/resources/template/scripts/divided/**/*.js',
    src2:  'source/resources/template/scripts/common.js',
    dest:  'source/resources/template/scripts/assembled'
} );

lazyRequireTask( 'dev:js:clean', './Gulptasks/dev/js/js-clean', {
    src:  'source/resources/template/scripts/assembled/*.*'
} );


lazyRequireTask( 'rel:js', './Gulptasks/rel/js/js', {
    src:   'source/resources/template/scripts/assembled/*.*',
    dest1: 'build/resources/template/scripts',
    dest2: 'build_ignore/resources/scripts'
} );

lazyRequireTask( 'rel:js:clean', './Gulptasks/rel/js/js-clean', {
    src1: 'build/resources/template/scripts/*.*',
    src2: 'build_ignore/resources/scripts/*.*'
} );

lazyRequireTask( 'rel:js:uglify', './Gulptasks/rel/js/js-uglify', {
    src:   'build/resources/template/scripts/scripts.js',
    dest1: 'build/resources/template/scripts',
    dest2: 'build_ignore/resources/scripts'
} );

/**
 * Javascript tasks
 * */




/**
 * HTML tasks
 * */

gulp.task( 'rel:html:create', shell.task(
    [
        'php html-converter.php -pindex',
        'php html-converter.php -phome',
        'php html-converter.php -p404'
    ],
    {
        cwd: 'source/php'
    }
));


lazyRequireTask( 'rel:html:clean', './Gulptasks/rel/html/html-clean', {
    src: 'build/**/*.html'
} );


gulp.task( 'rel:html:beautify', function() {
    gulp.src( 'build/**/*.html' )
        .pipe( htmlbeautify({
            indentSize: 2
        }) )
        .pipe( debug({ title: 'html-beautify' }) )             //debug
        .pipe( gulp.dest( 'build' ) )
});


gulp.task( 'rel:html:replace-folders', shell.task(
    [
        'php html-replace-folders.php'
    ],
    {
        cwd: 'Gulptasks/rel/html'
    }
));

/**
 * HTML tasks
 * */




/**
 * Assets tasks
 * */

gulp.task( 'rel:assets', function() {
    return gulp.src(  'source/assets/**/*.*' )
        .pipe( debug({ title: 'assets' }) )             //debug
        .pipe( gulp.dest( 'build/assets' ) );
});

lazyRequireTask( 'rel:assets:clean', './Gulptasks/rel/assets/assets-clean', {
    src: 'build/assets/**/*.*'
} );

gulp.task( 'rel:assets:image-optimization', function () {
        //gulpImagemin
    gulp.src( 'source/assets/template/images/**/*.*' )
        .pipe(gulpImagemin([
              gulpImagemin.gifsicle({interlaced: true}),
              gulpImagemin.jpegtran({progressive: true}),
              gulpImagemin.optipng({optimizationLevel: 5}),
              gulpImagemin.svgo({plugins: [{removeViewBox: true}]})
        ]))
        .pipe( gulp.dest('build/assets/template/images'));

        // console.log( 'Use photoshop - the Best method' );
});

/**
 * Asssets tasks
 * */




/**
 * Watch tasks
 * */

gulp.task( 'dev:watch:styles', function () {
    gulp.watch( 'source/resources/template/styles/**/*.scss', ['dev:build:styles'] );
});


gulp.task( 'dev:watch:js', function () {
    gulp.watch( 'source/resources/template/scripts/divided/**/*.js', ['dev:build:js'] );
});


gulp.task( 'dev:watch:js-common', function () {
    gulp.watch( 'source/resources/template/scripts/common.js', ['dev:build:js'] );
});


gulp.task( 'rel:watch:html', function () {
    gulp.watch( 'source/php/**/*.php', ['rel:build:html'] );
});

/**
 * Watch tasks
 * */




/**
 * Server tasks
 * */

gulp.task( 'dev:server', function() {
    browserSync.init({
        browser: [ "firefox" ],

        proxy: "localhost/2-Trainings/CSS/BEM/bem-ex-1-nango-home-01.loc/files-without-cms/source/php/page-builder.php"
    });

    browserSync.watch(
        'source/php/**/*.php'
    ).on( 'change', browserSync.reload );


    browserSync.watch(
        'source/resources/template/styles/css/styles.css'
    ).on( 'change', browserSync.reload );


    browserSync.watch(
        'source/resources/template/scripts/assembled/scripts.js'
    ).on( 'change', browserSync.reload );
});


gulp.task( 'rel:server', function() {
    browserSync.init({
        browser: [ "firefox" ],
        proxy: "localhost/2-Trainings/CSS/BEM/bem-ex-1-nango-home-01.loc/files-without-cms/build/"
    });

    browserSync.watch(
        'build/**/*.html'
    ).on( 'change', browserSync.reload );
});

/**
 * Server tasks
 * */




/**
 * Build tasks
 * */

gulp.task( 'dev:build:styles', function() {
    runSequence(
        'dev:styles:clean',
        'dev:styles'
    );
});


gulp.task( 'rel:build:styles', function() {
    runSequence(
        'rel:styles:clean',
        'rel:styles',
        'rel:styles:uncss',
        'rel:styles:nano'
    );
});


gulp.task( 'dev:build:js', function() {
    runSequence(
        'dev:js:clean',
        'dev:js'
    );
});


gulp.task( 'rel:build:js', function() {
    runSequence(
        'rel:js:clean',
        'rel:js',
        'rel:js:uglify'
    );
});


gulp.task( 'rel:build:html', function() {
    runSequence(
        'rel:html:clean',
        'rel:html:create',
        'rel:html:replace-folders',
        'rel:html:beautify'
    );
});


gulp.task( 'rel:build:assets', function() {
    runSequence(
        'rel:assets:clean',
        'rel:assets:image-optimization',
        'rel:assets'
    );
});

/**
 * Build tasks
 * */




/**
 * Development tasks
 * */

gulp.task( 'dev', [
    'dev:build:styles', 'dev:watch:styles',
    'dev:build:js',     'dev:watch:js',     'dev:watch:js-common',
    'dev:server'
] );

/**
 * Development tasks
 * */




/**
 * Release tasks
 * */

gulp.task( 'rel', [
    'rel:build:styles',
    'rel:build:js',
    'rel:build:html',   'rel:watch:html',
    'rel:build:assets',
    'rel:server'
] );

/**
 * Release tasks
 * */




/**
 * Deploy tasks
 * */

gulp.task('rel:html:deploy', function() {
    return gulp.src( 'build/**' )
        .pipe( rsync({
            root:        'build/',
            hostname:    'user@domain',
            destination: 'folder/from/domain',
            archive:      true,
            silent:       false,
            compress:     true
        }));
});

/**
 * Deploy tasks
 * */