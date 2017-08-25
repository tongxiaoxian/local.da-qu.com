$(document).ready(function() {
    $("body").each(function(index) {
        var image = $(this).children("img#backstretch").attr("src");
        $(this).backstretch(image);
    });
});