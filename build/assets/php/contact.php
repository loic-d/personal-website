<?php
if($_POST){

    $message = "E-mail: " . $_POST['email'] . "<br/>" . "Message:" . $_POST['message'];

    if (mail('loic.delaubier@gmail.com', 'New message from personal website', $message)){
        return 'success';
    }
    else {
        return 'error';
    }

}
?>