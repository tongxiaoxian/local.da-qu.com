$(document).ready(function() {
    $('section.backstretch').each(function(index) {
        var image = $(this).children('img#backstretch').attr("src");
        $(this).backstretch(image);
    });
});

$(document).ready(function() {
    var image = $('img#banner').attr("src");
     $('section.banner').backstretch(image);
});

$(document).ready(function() {
    var image = $('img#background').attr("src");
     $('section.background').backstretch(image);
});




$(document).ready(function() {
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        direction: 'vertical',
        paginationClickable: true,
        mousewheelControl: true,
        touchAngle: 75,
        hashnav: true,
        slidesPerView: 4,
        breakpoints: {
        // when window width is <= 1001px
            1001: {
                slidesPerView: 4,
            }
        }
    });
});

$(document).ready(function() {
    $('#header').headroom();
});


// $(document).ready(function() {

//     $("a.message_about").click(function() {
//         $("article.message_abstract, div.message_share, p.pagination").velocity('transition.fadeOut', {duration: 800, complete: function() {
//             $("div.message_about").velocity('transition.fadeIn', {duration: 1500, complete: function() {
//             }});
//         }});    
//     });

//     $("a.message_share").click(function() {
//         $("article.message_abstract, div.message_about, p.pagination").velocity('transition.fadeOut', {duration: 800, complete: function() {
//             $("div.message_share").velocity('transition.fadeIn', {duration: 1500, complete: function() {
//             }});
//         }});    
//     });

// });

// $('#clock').countdown('2016/11/26 16:00:00', function(event) {
//     $(this).html(event.strftime('%D 天 %H 时 %M 分'));
// });