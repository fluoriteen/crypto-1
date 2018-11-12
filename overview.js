$(function() {
  var scrollTimer, lastScrollFireTime = 0;
  processProgressScroll(); 
  
  $(window).on('scroll', function() {

      var minScrollTime = 50;
      var now = new Date().getTime();

      if (!scrollTimer) {
          if (now - lastScrollFireTime > (3 * minScrollTime)) {
              processProgressScroll();   // fire immediately on first scroll
              lastScrollFireTime = now;
          }
          scrollTimer = setTimeout(function() {
              scrollTimer = null;
              lastScrollFireTime = new Date().getTime();
              processProgressScroll();
          }, minScrollTime);
      }
  });
});

function processProgressScroll() {
  $progress = $('#progressScroll');

  var scrollPosition = $(document).scrollTop() / ($(document).height() - $(window).height()) * 100;
  $progress.attr('aria-valuenow', scrollPosition );
  $progress.css('width', scrollPosition + '%' );
}
