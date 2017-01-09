$(document).ready(function() {
	$("section.backstretch").each(function(index) {
		var image = $(this).children("img").attr("src");
  		$(this).backstretch(image, {preload:2});
	});
});	

$(document).ready(function() {
	document.oncontextmenu = function () { return false; }
});