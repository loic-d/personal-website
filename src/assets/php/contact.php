<?php
    if($_POST){
        $message = "E-mail: " . $_POST['email'] . "<br/>" . "Message:" . $_POST['message'];

        if (mail('loic.delaubier@gmail.com', 'New message from personal website', $message, "From: loic.delaubier@gmail.com\r\n")){
            echo 'message sent';
        }
        else {
            echo 'error';
        }
    }
?>