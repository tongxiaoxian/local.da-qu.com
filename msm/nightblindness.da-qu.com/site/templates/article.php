<?php snippet('header') ?>

<article class="text">
  <h1><?php echo $page->title()->html() ?></h1>
  <?php echo $page->text()->kirbytext() ?>
</article>

<div class="meta cf">
  <time datetime="<?php echo $page->date('c') ?>" pubdate="pubdate"><?php echo $page->date('d F Y') ?>.</time>
</div>

<nav class="nextprev cf" role="navigation" style="display: none;">
  <?php if($prev = $page->prevVisible()): ?>
  <a class="prev" href="<?php echo $prev->url() ?>">&larr; previous</a>
  <?php endif ?>
  <?php if($next = $page->nextVisible()): ?>
  <a class="next" href="<?php echo $next->url() ?>">next &rarr;</a>
  <?php endif ?>
</nav>

<?php snippet('footer') ?>