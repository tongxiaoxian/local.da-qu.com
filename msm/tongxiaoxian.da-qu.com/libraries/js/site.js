$(document).ready(function() {
    $('body').click(function() {
        $('#curtain').velocity('transition.fadeOut', {duration: 800})
    });
});

$(document).ready(function() {
  $('body').swipe({
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        $('#curtain').velocity('transition.fadeOut', {duration: 800});
    },
        threshold:0,
        fingers:'all'
    });

});
