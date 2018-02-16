<div class="cards cf">
  <?php foreach(page('projects')->children()->visible() as $project): ?>
	<a href="<?php echo $project->url() ?>" class="card link al cursorTrigger">
        <span class="text-container">
            <h4 class="letters"><?php echo $project->title()->html() ?></h4>
            <time><?php echo $project->year() ?></time>
            <span class="icon-arrow fa fa-long-arrow-right"></span>
        </span>
		<?php if($image = $project->images()->sortBy('sort', 'asc')->first()): ?>
			<span class="image-container">
				<img data-adaptive-background
                      src="<?= thumb($image, array('width' => 520, 'height' => 325, 'crop' => true))->url() ?>"
                      alt="<?= $project->title()->html() ?>" />
			</span>
		<?php endif; ?>
	</a>
  <?php endforeach ?>
</div>
