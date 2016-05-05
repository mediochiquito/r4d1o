<?
include 'init.php';
include 'Mobile_Detect.php';
$detect = new Mobile_Detect;
?>
<html>
    <head>
        <title>Súper Radio Ta-Ta</title>
        <meta property="al:ios:app_store_id" content="0"/>
        <meta property="al:ios:app_name" content="Súper Rádio Ta-Ta" />
        <meta property="al:ios:url" content="superradiotata://home" />
        <meta property="al:android:url" content="superradiotata://" />
        <meta property="al:android:app_name" content="Súper Radio Ta-Ta" />
        <meta property="al:android:package" content="com.tata.radio">
        <meta property="al:web:url" content="https://itunes.apple.com/app/0?mt=8" />
        <meta property="al:web:should_fallback" content="false" />
        <meta property="og:image" content="<?= SERVER ?>/img/share.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:description"
              content="Estoy escuchando <?= $_GET['c'] ?> por  <?= $_GET['a'] ?> en Súper Radio Ta-Ta. Descargala la App haciendo click aquí."/>
    </head>

<body>
<?php
$urt_store = "https://play.google.com/store?hl=es";
if($detect->isIOS()) $urt_store = "https://itunes.apple.com/es/genre/ios/id36?mt=8";
?>
<script>
    document.location.href = '<?=$urt_store?>';
</script>
</body>
</html>

