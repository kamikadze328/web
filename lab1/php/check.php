<?php

    function check($x, $y, $r)
    {
        if (($x >= -$r / 2 && $x <= 0 && $y <= $r && $y >= 0)
            || ($y >= -($x + $r) && $y <= 0 && $x <= 0)
            || (($x * $x + $y * $y) <= $r * $r / 4 && $x >= 0 && $y <= 0)) {
            return "<span style='color: green'>True</span>";
        } else {
            return "<span style='color: red'>False</span>";
        }
    }

    function checkValue($x, $y, $r)
    {
        return !in_array($r, array(1, 2, 3, 4, 5)) || !is_numeric($y) || $y < -3 || $y > 5 || !is_numeric($x) || $x < -5 || $x > 5 ;
    }

    session_start();

    date_default_timezone_set('Europe/Moscow');
    $currentTime = date("H:i:s");
    $start = microtime(true);

    $x = (float) str_replace(",", ".", $_POST['x_value']);
    $y = (float) str_replace(",", ".", $_POST['y_value']);
    $r = (int) $_POST['r_value'];

    if (checkValue($x, $y, $r) || $_POST['x_value']=="" || $_POST['y_value']=="") {
        http_response_code(400);
        return;
    }

    $res = check ($x, $y, $r);

    $time = microtime(true) - $start;

    $result = array($x, $y, $r, $res, $currentTime, $time);

    if (!isset($_SESSION['history'])) {
        $_SESSION['history'] = array();

    }

    array_push($_SESSION['history'], $result);

    include "table.php";
