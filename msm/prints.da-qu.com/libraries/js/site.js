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
        effect: 'fade',
        slidesPerView: 1,
        breakpoints: {
        // when window width is <= 1001px
            1001: {
                slidesPerView: 1,
            }
        }
    });
});

$(document).ready(function($) {
    $(".royalSlider").royalSlider({
        // options go here
        // as an example, enable keyboard arrows nav
        transitionType: 'fade',
        keyboardNavEnabled: true
    });  
});


$(document).ready(function() {
    $('body').click(function() {
        $('header').velocity('transition.fadeOut', {duration: 800})
    });
});

$(document).ready(function() {
  $('body').swipe({
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        $('header, #saver').velocity('transition.fadeOut', {duration: 800});
    },
        threshold:0,
        fingers:'all'
    });
});

/* Saver js */
$(document).ready(function() {

    var s_saver;

    $('body').mousemove(function() {
        clearTimeout(s_saver);

        s_saver = setTimeout(function() {
            $('#saver').fadeIn(900);
        }, 30000);

        $('#saver').fadeOut(500);
    });

    $('body').keydown(function() {
        clearTimeout(s_saver);

        s_saver = setTimeout(function() {
           $('#saver').fadeIn(900);
        }, 30000);

        $('#saver').fadeOut(500);
    });

});

