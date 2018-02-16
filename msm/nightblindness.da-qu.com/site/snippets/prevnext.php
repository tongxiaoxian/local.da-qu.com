<?php

/*

The $flip parameter can be passed to the snippet to flip
prev/next items visually:

```
<?php snippet('prevnext', ['flip' => true]) ?>
```

Learn more about snippets and parameters at:
https://getkirby.com/docs/templates/snippets

*/

$directionPrev = @$flip ? 'right' : 'left';
$directionNext = @$flip ? 'left'  : 'right';

if($page->hasNextVisible() || $page->hasPrevVisible()): ?>
  <nav class="pagination <?= !@$flip ?: ' flip' ?> wrap cf cards">
    <?php
        if($page->hasNextVisible()):
            $pageNextImage = $page->nextVisible()->images()->sortBy('sort', 'asc')->first();
            $pageNextTitle = $page->nextVisible()->title();
            $pageNextURL = $page->nextVisible()->url();
    ?>
        <a href="<?= $pageNextURL ?>" class="card link al">
            <span class="text-container">
                <span>Next</span><br />
                <h3><?= $page->nextVisible()->title() ?></h3>
            </span>
            <span class="image-container">
                <img src="<?= thumb($pageNextImage, array('width' => 520))->url() ?>" alt="<?= $pageNextTitle ?>" />
            </span>
        </a>
    <?php
        elseif($page->isLastPage()):
            $pageFirstImage = $pages->children()->first()->images()->sortBy('sort', 'asc')->first();
            $pageFirstTitle = $pages->children()->first()->title();
            $pageFirstURL = $pages->children()->first()->url();
    ?>
        <a href="<?= $pageFirstURL ?>" class="card link al">
            <span class="text-container">
                <span>Next</span><br />
                <h3><?= $pageFirstTitle ?></h3>
            </span>
            <span class="image-container">
                <img src="<?= thumb($pageFirstImage, array('width' => 520))->url() ?>" alt="<?= $pageFirstTitle ?>" />
            </span>
        </a>
    <?php endif ?>
  </nav>
<?php endif ?>
