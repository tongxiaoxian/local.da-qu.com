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
    $('body').click(function() {
        $('header').velocity('transition.fadeOut', {duration: 800})
    });
});


// $(document).ready(function() {
//     var myElement = $('*');
//         var mc = new Hammer(myElement);
//         mc.on("swipe pan pinch tap press", function(ev) {
//             $('header').velocity('transition.fadeOut', {duration: 800});
//         });  
// });


$(document).ready(function() {
  $('body').swipe({
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        $('header').velocity('transition.fadeOut', {duration: 800});
    },
        threshold:0,
        fingers:'all'
});

  //Set some options later
  $("#test").swipe( {fingers:2} );
});


$(document).ready(function() {

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



