<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = htmlspecialchars($_POST['name']); // Bezpečnostní funkce
        $email = htmlspecialchars($_POST['email']); // Bezpečnostní funkce
        $phone = htmlspecialchars($_POST['phone']); // Bezpečnostní funkce
        $subject = htmlspecialchars($_POST['subject']); // Bezpečnostní funkce
        $message = htmlspecialchars($_POST['message']); // Bezpečnostní funkce

        $prijemce = "divis.tereza@gmail.com"; // Zde zadejte vaši emailovou adresu
        $vlastni_predmet = "Zpráva z formuláře: " . $subject;
        $text_zpravy = "Jméno: " . $name . "\nEmail: " . $email . "\nTelefon: " . $phone . "\n\nZpráva:\n" . $message;

        // Odeslání emailu
        if (mail($prijemce, $vlastni_predmet, $text_zpravy)) {
            echo "Děkuji za vaši zprávu!";
        } else {
            echo "Při odesílání došlo k chybě.";
        }
    }
    ?>