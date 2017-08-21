
const gulp = require('gulp');
const del  = require('del');
const $    = require('gulp-load-plugins')();


module.exports = function( options ) {

    return function () {
        return del(
            options.src1,
            options.src2            
        );
    };

};