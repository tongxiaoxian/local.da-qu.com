$(document).ready(function() {
	$("section.backstretch").each(function(index) {
		var image = $(this).children("img#backstretch").attr("src");
  		$(this).backstretch(image);
	});
});