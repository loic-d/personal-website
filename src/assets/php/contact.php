<?php

    header('Access-Control-Allow-Origin: https://loic-delaubier.com');

    if($_POST){
        $headers ='From: contact@loic-delaubier.com'."\n";
        $headers .='Reply-To: contact@loic-delaubier.com'."\n";
        $headers .='Content-Type: text/plain; charset="iso-8859-1"'."\n";
        $headers .='Content-Transfer-Encoding: 8bit';

        reset($_POST);
        $json = key($_POST);
        $obj = json_decode($json);
        $message = $obj->{'email'} . " " . $obj->{'message'};

        if (mail('loic.delaubier@gmail.com', 'New message from personal website', $message, $headers)){
            echo 'message sent';
        }
        else {
            echo 'error';
        }
    }
?>
