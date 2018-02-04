<!doctype html>
<html lang="<?= site()->language() ? site()->language()->code() : 'en' ?>">
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">

    <title><?= $site->title()->html() ?> &middot; <?= $page->title()->html() ?></title>
    <meta name="description" content="<?= $site->description()->html() ?>">

    <meta name="twitter:image" content="http://themes.yordanoff.net/konstruct/konstruct.jpg" />
    <meta name="og:image" content="http://themes.yordanoff.net/konstruct/konstruct.jpg" />

    <?php snippet('metaicons') ?>

    <?= css('assets/css/main.css') ?>
    <?php foreach($page->files()->filterBy('extension', 'css') as $css): ?>
        <?= css($css->url()) ?>
    <?php endforeach ?>

    <script type="text/javascript" src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/masonry-layout@4.1.1/dist/masonry.pkgd.min.js"></script>
    <?= js('assets/scripts/animsition.min.js') ?>
    <?= js('assets/scripts/jquery.fullpage.min.js') ?>
    <?= js('assets/scripts/jquery.adaptive-backgrounds.js') ?>
    <?= js('assets/scripts/elastic.js') ?>

</head>
<body class="<?= $page->intendedTemplate()?>">

    <header class="header cf" role="banner">
        <a href="<?= url() ?>" class="logo al" rel="home"><?= $site->title()->html() ?></a>
        <?php snippet('menu') ?>
    </header>

    <div id="container">
        <div id="fullpage">
