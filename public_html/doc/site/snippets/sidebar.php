
<aside>
  <div class="intro"><?php echo $site->description()->kirbytext() ?></div>
  <a class="skip-link visuallyhidden focusable" href="#main">Skip to Main Content</a>
  <nav class="sidebar-nav">
    <ul>
      <?php foreach($pages->visible() as $p): ?>
      <li class="group<?php e($p->isOpen(), ' sidebar-nav-active') ?>">

        <?php if($p->hasVisibleChildren() && $p->isOpen()) : ?>
          <button class="expand-subnav" aria-expanded="true" aria-controls="nav-collapsible-<?php echo $p->uid() ?>">+</button>
        <?php endif ?>
        <?php if($p->hasVisibleChildren() && !$p->isOpen()): ?>
          <button class="expand-subnav" aria-expanded="false" aria-controls="nav-collapsible-<?php echo $p->uid() ?>">+</button>
        <?php endif ?>
        <a href="<?php echo $p->url() ?>"><?php echo $p->title()->html() ?></a>

        <?php if($p->hasVisibleChildren() && $p->isOpen()): ?>
          <ul class="submenu nav-children" id="nav-collapsible-<?php echo $p->uid() ?>" aria-hidden="false">
        <?php endif ?>
        <?php if($p->hasVisibleChildren() && !$p->isOpen()): ?>
        <ul class="submenu nav-children" id="nav-collapsible-<?php echo $p->uid() ?>" aria-hidden="true">
        <?php endif ?>

        <?php if($p->hasVisibleChildren()) : ?>
          <?php foreach($p->children()->visible() as $p): ?>
          <li class="<?php e($p->isOpen(), 'sidebar-nav-active') ?>">
            <a href="<?php echo $p->url() ?>"><?php echo $p->title()->html() ?></a>
          </li>
          <?php endforeach ?>
        </ul>
        <?php endif ?>

      </li>
      <?php endforeach ?>
    </ul>
  </nav>
</aside>
