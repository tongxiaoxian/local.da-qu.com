$(document).ready(function() {
	var image = $('#backstretch').attr("src");
	$("header").backstretch(image, {speed: 150});
});

$(document).ready(function() {
	document.oncontextmenu = function () { return false; }
});

// $(document).ready(function() {
//     AOS.init({
//     	duration: 1200
//       // offset: 200,
//       // duration: 600,
//       // easing: 'ease-in-sine',
//       // delay: 100,
//     });
// });