// $(document).ready(function() {
//     var image = $('img#backstretch').attr("src");
//     $('header').backstretch(image);
// });

$(document).ready(function() {
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        touchAngle: 75,
        hashnav: true,
        slidesPerView: 1,
        breakpoints: {
        // when window width is <= 1001px
            1001: {
                slidesPerView: 1,
            }
        }
    });
});

$(document).ready(function() {
    $('header').click(function() {
        $(this).css("display","none");
    });
});