<?php
header('Content-type: text/html; charset=utf-8');
error_reporting(E_ERROR|E_WARNING|E_PARSE|E_NOTICE|E_ALL);
ini_set('display_errors', 1);


foreach ( new DirectoryIterator( '../../../build' ) as $file ) {
    if ( $file -> getExtension() === 'html' ) {

        //read the entire string
        $str = file_get_contents( $file -> getPathname(), FILE_USE_INCLUDE_PATH );
        

        //replace something in the file string - this is a VERY simple example
        $source_path = array(
            '../resources/template/styles/css/styles.css',
            '../resources/template/scripts/assembled/scripts.js'
        );

        $build_path  = array(
            'resources/template/styles/styles.min.css',
            'resources/template/scripts/scripts.min.js'
        );

        $str = str_replace( $source_path, $build_path, $str );


        //write the entire string
        file_put_contents( $file -> getPathname(), $str, FILE_USE_INCLUDE_PATH );
    }
}


foreach ( new DirectoryIterator( '../../../build/single' ) as $file_single ) {
    if ( $file_single -> getExtension() === 'html' ) {

        //read the entire string
        $str_single = file_get_contents( $file_single -> getPathname(), FILE_USE_INCLUDE_PATH );


        //replace something in the file string - this is a VERY simple example
        $source_path_single = array(
            '../resources/template/styles/css/styles.css',
            '../resources/template/scripts/assembled/scripts.js'
        );

        $build_path_single  = array(
            '../resources/template/styles/styles.min.css',
            '../resources/template/scripts/scripts.min.js'
        );

        $str_single = str_replace( $source_path_single, $build_path_single, $str_single );


        //write the entire string
        file_put_contents( $file_single -> getPathname(), $str_single, FILE_USE_INCLUDE_PATH );
    }
}
