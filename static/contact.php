<?php
    $name = htmlspecialchars($_POST['name'], ENT_QUOTES); 
    $email = htmlspecialchars($_POST['email'], ENT_QUOTES);
    $message = htmlspecialchars($_POST['message'], ENT_QUOTES);

    $spam_check_1 = htmlspecialchars($_POST['spamcheck1'], ENT_QUOTES);
    $spam_check_2 = htmlspecialchars($_POST['spamcheck2'], ENT_QUOTES);

    $spam_code_1 = 'amb_spam_check_1_passed';
    $spam_code_2 = 'amb_spam_check_2_passed';
    $spam_check_passed = $spam_check_1 === $spam_code_1 && $spam_check_2 === $spam_code_2;

    $content = strlen($message) >= 10;
                
    if ($content && $spam_check_passed){
        $to = "contact@adomasmb.com";
        $betreff = "AMB Website - Contact Form Message";
        $from = "From: AMB Website <contact@adomasmb.com>";
        $text = "Message from " . $name . " (" . $email . "):\n\n" . $message . "\n\n[END MESSAGE]";

        mail($empfaenger, $betreff, $text, $from);

        exit();
    } else {
        http_response_code(500);
        exit();
    }
?>
