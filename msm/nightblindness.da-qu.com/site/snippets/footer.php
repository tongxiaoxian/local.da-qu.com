        <div class="section section-inner-container fp-auto-height">
            <div class="section-inner dark" style="margin-top: 1%">
                <div style="padding-top: 6%">
                    <?php if( $page->intendedTemplate() == 'project'): ?>
                        <?php snippet('prevnext') ?>
                    <?php endif ?>
                    <div class="section footer fp-auto-height dark" role="contentinfo">
                        <div class="wrap ta-center" style="text-align:center">
                            <?php snippet('social'); ?>
                            <div class="cf"></div>
                            <p>
                                <?= $site->copyright()->kirbytext()?>
                            </p>
                        </div>
                    </div>
                </div>
            </div><!-- .section-inner -->
        </div>

    </div><!-- #fullpage -->
</div><!-- #container -->

<?= js('assets/scripts/main.js') ?>

</body>
</html>
