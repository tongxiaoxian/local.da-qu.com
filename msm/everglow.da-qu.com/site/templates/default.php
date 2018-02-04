<?php snippet('header') ?>

<div class="section <?= $page->sectiontype() ?> fp-auto-height-mobile links-body"
    <div class="section cursorTriggerDown"
    <?php if($page->image('background.jpg')) : ?>
        style="background-image: url(<?php echo $page->image('background.jpg')->url() ?>)"
    <?php endif; ?>
        >



    <div class="grid">

            <?php if($page->file('header.mp4')) : ?>
            	<div class="fullscreen-video-container">
            		<video loop muted autoplay
                        <?php if($page->file('header-frame.jpg')): ?>
                            poster="<?php echo $page->image('header-frame.jpg')->url() ?>"
                        <?php endif; ?>
                            class="fullscreen-video"
                            id="video">

            			<source src="<?php echo $page->file('header.mp4')->url() ?>" type="video/mp4">

                        <?php if($page->file('header.ogv')): ?>
            			    <source src="<?php echo $page->file('header.ogv')->url() ?>" type="video/ogv">
                        <?php endif; ?>

                        <?php if($page->file('header.webm')): ?>
            			    <source src="<?php echo $page->file('header.webm')->url() ?>" type="video/webm">
                        <?php endif; ?>
            		</video>
            	</div>
            <?php endif; ?>
        <div class="wrap-lg">

            <?php // echo $page->title()->html() ?>

            <div class="col-6"></div>
            <div class="col-6">
                <h1><?= $page->intro()->kirbytext() ?></h1>
            </div>

            <div class="cf"></div>

            <div class="col-6"></div>
            <div class="col-6">
                <?= $page->text()->kirbytext() ?>
            </div>

        </div>
    </div>
</div>

<div class="section fp-auto-height-mobile" style="overflow: auto;">
    <div class="grid">
        <div class="wrap">
            <?php snippet('showcase') ?>
        </div>
    </div>

    <div class="background"></div>

    <svg viewbox="0 0 100 200" preserveAspectRatio="none" class="svg-path">
        <path id="box" d="M0,0 H100 V100 Q50,150 0,100"></path>
    </svg>
</div>

<?php snippet('footer') ?>
