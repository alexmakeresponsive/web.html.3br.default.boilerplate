<?php
header('Content-type: text/html; charset=utf-8');
error_reporting(E_ERROR|E_WARNING|E_PARSE|E_NOTICE|E_ALL);
ini_set('display_errors', 1);


if ( isset( $_GET['page'] ) ) {

    require_once 'parts/page-head.php';

    require_once 'pages/'. $_GET['page'] .'.php';

    require_once 'parts/page-end.php';

} else {
    header('Location: '.$_SERVER['REQUEST_URI'].'?page=home');
}

