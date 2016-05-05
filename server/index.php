<?
include 'init.php';
?>
<html>
<head>

    <meta property="al:ios:url" content="fb1690832551175845://home" />
    <!-- <meta property="al:ios:app_store_id" content="342792525" /> -->
    <meta property="al:ios:app_name" content="Súper Radio Ta-Ta" />
    <meta property="al:web:should_fallback" content="false" />

    <meta property="og:title" content="Super Radio Ta-Ta"/>
    <meta property="og:image" content="<?=SERVER?>/img/share.png"/>
    <meta property="og:image:width" content="1200"/>
    <meta property="og:image:height" content="630"/>
    <meta property="og:description"
          content="Estoy escuchando <?= $_GET['c'] ?> por  <?= $_GET['a'] ?> en Super Radio Ta-Ta. Descargala la App haciendo click aquí. "/>
    

      <meta property="fb:app_id" content="1690832551175845">
</head>
<body>
Super Radio Ta-Ta

<a href='fb1690832551175845://home'>test</a>

</body>
</html>