/* ==========================================================================
   horizontal scroll
   ========================================================================== */

$(document).ready(function() {
	$(function() {
		$('html').bind('mousewheel', function(event, delta, deltaX, deltaY) {
			var scroll = parseInt( $(window).scrollLeft() );
		$('html, body, main').scrollLeft( scroll - ( deltaY * 5 ) );
			event.preventDefault();
		});
	});
});


/* ==========================================================================
   h1.preparing
   ========================================================================== */

$(document).ready(function() {
	$('h1.preparing a').click(function(e){
		e.preventDefault(); 
	});
});

/* ==========================================================================
   Center Layout
   ========================================================================== */
   
$(document).ready(function() {
	var window_height = $(window).height();
	var works_main = $('main.works_main');
	var works_chapter = $('main.works_chapter');
	var works_detail = $('main.works_detail');
	
	works_main.css({
		'padding-top': window_height/2 - 120 + 'px'
	});

	works_chapter.css({
		'padding-top': window_height/2 - 200 + 'px'
	});

	works_detail.css({
		'padding-top': window_height/2 - 120 + 'px'
	});		

});


/* ==========================================================================
   Space Between
   ========================================================================== */

$(document).ready(function() {
	var window_width = $(window).width();
	var section_first = $('main.works_main section:first');
	var section = $('main.works_main section');
	var section_margin_left = window_width/2 - section_first.width()/2;
	
	section.css({
		'margin-left': section_margin_left + 'px',
		'margin-right': section_margin_left + 'px',
	});

});
	



