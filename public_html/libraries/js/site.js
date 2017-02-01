$(document).ready(function() {
    $("section.backstretch").each(function(index) {
        var image = $(this).children("img#backstretch").attr("src");
        $(this).backstretch(image);
    });
});


$(document).ready(function() {
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        touchAngle: 75,
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

$(document).ready(function() {
    var $grid = $('div#masonry').imagesLoaded( function() {
      // init Masonry after all images have loaded
      $grid.masonry({
        itemSelector: '.box',
        columnWidth: 160
      });
    });
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