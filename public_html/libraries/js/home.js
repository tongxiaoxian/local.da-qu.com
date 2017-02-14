$(document).ready(function() {
    $("section.backstretch").each(function(index) {
        var image = $(this).children("img.backstretch").attr("src");
        $(this).backstretch(image);
    });
});

$(document).ready(function() {
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        touchAngle: 90,
        hashnav: true,
        slidesPerView: 2,
        breakpoints: {
        // when window width is <= 1001px
            1001: {
                slidesPerView: 1,
            }
        }
    });
});