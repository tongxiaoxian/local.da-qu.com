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

    $("#header").headroom();

});


$(document).ready(function() {

    // init controller
    var controller = new ScrollMagic.Controller();

    // create a scene
    new ScrollMagic.Scene({
            duration: 0,  // the scene should last for a scroll distance of 100px
            offset: 0      // start this scene after scrolling for 50px
        })
        .setPin("#my-sticky-element") // pins the element for the the scene's duration
        .addTo(controller); // assign the scene to the controller

});
