<div class="social">
    <?php if($site->socialFacebook()->isNotEmpty()) : ?>
        <a href="<?php echo $site->socialFacebook()->html() ?>" target="_blank">
            <i class="fa fa-facebook-official"></i>
        </a>
    <?php endif ?>
    <?php if($site->socialTwitter()->isNotEmpty()) : ?>
        <a href="<?php echo $site->socialTwitter()->html() ?>" target="_blank">
            <i class="fa fa-twitter"></i>
        </a>
    <?php endif ?>
    <?php if($site->socialLinkedin()->isNotEmpty()) : ?>
        <a href="<?php echo $site->socialLinkedin()->html() ?>" target="_blank">
            <i class="fa fa-linkedin-square"></i>
        </a>
    <?php endif ?>
    <?php if($site->socialInstagram()->isNotEmpty()) : ?>
        <a href="<?php echo $site->socialInstagram()->html() ?>" target="_blank">
            <i class="fa fa-instagram"></i>
        </a>
    <?php endif ?>
    <?php if($site->socialDribbble()->isNotEmpty()) : ?>
        <a href="<?php echo $site->socialDribbble()->html() ?>" target="_blank">
            <i class="fa fa-dribbble"></i>
        </a>
    <?php endif ?>
    <?php if($site->socialBehance()->isNotEmpty()) : ?>
        <a href="<?php echo $site->socialBehance()->html() ?>" target="_blank">
            <i class="fa fa-behance"></i>
        </a>
    <?php endif ?>
    <?php if($site->socialGithub()->isNotEmpty()) : ?>
        <a href="<?php echo $site->socialGithub()->html() ?>" target="_blank">
            <i class="fa fa-github"></i>
        </a>
    <?php endif ?>
    <?php if($site->socialMedium()->isNotEmpty()) : ?>
        <a href="<?php echo $site->socialMedium()->html() ?>" target="_blank">
            <i class="fa fa-medium"></i>
        </a>
    <?php endif ?>
    <?php if($site->socialYouTube()->isNotEmpty()) : ?>
        <a href="<?php echo $site->socialYouTube()->html() ?>" target="_blank">
            <i class="fa fa-youtube"></i>
        </a>
    <?php endif ?>
    <?php if($site->socialVimeo()->isNotEmpty()) : ?>
        <a href="<?php echo $site->socialVimeo()->html() ?>" target="_blank" rel="follow">
            <i class="fa fa-vimeo"></i>
        </a>
    <?php endif ?>
    <?php if($site->socialSnapchat()->isNotEmpty()) : ?>
        <a href="<?php echo $site->socialSnapchat()->html() ?>" target="_blank" rel="follow">
            <i class="fa fa-snapchat"></i>
        </a>
    <?php endif ?>
    <?php if($site->socialSoundcloud()->isNotEmpty()) : ?>
        <a href="<?php echo $site->socialSoundcloud()->html() ?>" target="_blank" rel="follow">
            <i class="fa fa-soundcloud"></i>
        </a>
    <?php endif ?>
    <?php if($site->socialSpotify()->isNotEmpty()) : ?>
        <a href="<?php echo $site->socialSpotify()->html() ?>" target="_blank" rel="follow">
            <i class="fa fa-spotify"></i>
        </a>
    <?php endif ?>
    <?php if($site->socialEmail()->isNotEmpty()) : ?>
        <a href="mailto:<?php echo $site->socialEmail()->html() ?>">
            <i class="fa fa-envelope-square"></i>
        </a>
    <?php endif ?>
</div><!-- .social -->
