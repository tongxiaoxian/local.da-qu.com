<nav class="navigation column" role="navigation">
  <ul class="menu">
    <?php foreach($pages->visible() as $item): ?>
    <li class="menu-item<?= r($item->isOpen(), ' is-active') ?>">
        <?php if($item->isOpen()) : ?>
            <a href="<?= url() ?>" class="al"
                data-animsition-in-class="fade-in-down-sm"
                data-animsition-out-class="fade-out-down-sm">
                <span>Close</span>
                <i class="fa fa-close"></i>
            </a>
        <?php else: ?>
            <a href="<?= $item->url() ?>" class="al"
                data-animsition-in-class="fade-in-up-sm"
                data-animsition-out-class="fade-out-up-sm">
                <span><?= $item->title()->html() ?></span>
                <i class="fa fa-circle-o"></i>
            </a>
        <?php endif; ?>
    </li>
    <?php endforeach ?>
  </ul>
</nav>
