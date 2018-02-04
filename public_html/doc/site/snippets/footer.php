
<footer>
  <div class="wrap">
    <p>This project is maintained by <a href="<?php echo $site->authorurl()->html() ?>"><?php echo $site->author()->html() ?></a>.</p>
    <?php echo $site->copyright()->kirbytext() ?>
  </div><!--/.wrap -->
</footer>

<?php echo js('assets/js/libs/highlight.pack.js') ?>
<?php echo js('assets/js/libs/accordion-plain.js') ?>
<?php echo js('assets/js/kdoc.js') ?>
<?php
if (c::get('kdoc.mathjax')) {
  $url = c::get('kdoc.mathjax.url');
  if (!empty($url)) {
    $config = c::get('kdoc.mathjax.config');
    if (!empty($config)) {
      $url .= '?config=' . $config;
    }
    echo js($url);
  }
}
?>

</div> <!-- /.container -->
</body>
</html>
