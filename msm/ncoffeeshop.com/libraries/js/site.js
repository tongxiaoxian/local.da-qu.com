$(document).ready(function() {
	var image = $('#backstretch').attr("src");
	$("main").backstretch(image, {speed: 150});
});

$(document).ready(function() {
	document.oncontextmenu = function () { return false; }
});