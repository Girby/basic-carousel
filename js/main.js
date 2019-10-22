var Carousel = new BasicCarousel({
    target: 'carousel',
    width: 500,
    slideAmount: 15
});

// Plyr video setup
const player = new Plyr('#demo-player');

$(document).on("click", ".goToBtn", function(){
  Carousel.goTo(2);
})
