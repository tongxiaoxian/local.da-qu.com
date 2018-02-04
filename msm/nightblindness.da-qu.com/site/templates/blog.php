<?php snippet('header') ?>

<?php $blog = $page->children()->visible()->flip()->paginate(6) ?>

<?php if($page->children()->visible()->count()): ?>

<?php foreach($blog as $article): ?>
<article class="article">
  <h3><a href="<?php echo $article->url() ?>"><?php echo $article->title()->html() ?></a></h3>
  <time datetime="<?php echo $article->date('c') ?>" pubdate="pubdate"><?php echo $article->date('d F Y') ?></time>
</article>
<?php endforeach ?>

<?php if($blog->pagination()->hasPages()): ?>
<nav class="pagination cf">
	<?php if($blog->pagination()->hasNextPage()): ?>
	<a class="btn-next" data-site="<?php echo $blog->pagination()->nextPage() ?>" data-href="<?php echo $blog->pagination()->nextPageURL() ?>">Next</a>
	<?php else: ?>
	<p class="end">Fin.</p>
	<?php endif ?>
</nav>
<?php endif ?>

<?php else: ?>
<article class="text">
  <?php echo $page->text()->kirbytext() ?>
</article>
<?php endif ?>

<?php snippet('footer') ?>