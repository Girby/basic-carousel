(function() {

    // Define our constructor
    this.BasicCarousel = function() {

      // Create global element references
      this.target = null;
      this.initClass = 'basic-carousel-init';

      // Define option defaults
      var defaults = {
        target : this.target,
        slideAmount: null
      }

      // Create options by extending defaults with the passed in arugments
      if (arguments[0] && typeof arguments[0] === "object") {
        this.options = extendDefaults(defaults, arguments[0]);
      }

      // Check to see if the target el exists
      if(this.options.target !== null && this.options.target !== "") {
        if(getTarget(this.options.target)){
          buildOut.call(this);
        }else this.target = "Error";
      }else this.target = "Error";
    }

    // Public Methods

    BasicCarousel.prototype.goTo = function(e) {
      if (getCarouselEls(this.target)) {
        //  to do
      }
    }

    // Private Methods

    function buildOut() {
      this.target = document.getElementById(this.options.target);

      this.target.className += " " + this.initClass;

      if (getCarouselEls(this.target)) {
        setChildrenWidth(getCarouselEls(this.target), this.options.width);
        setChildClasses(getCarouselEls(this.target));
        createCarouselInnerEls(getCarouselEls(this.target), this.target);
        setTrackWidth();
        setPrevNextButton(this);

        initializeEvents(this);
      }

    }

    function extendDefaults(source, properties) {
      var property;
      for (property in properties) {
        if (properties.hasOwnProperty(property)) {
          source[property] = properties[property];
        }
      }
      return source;
    }

    // Create the carousel container and carousel track and append the targets children to the track
    function createCarouselInnerEls(els, target){
      let carouselContainer = document.createElement('div');
      carouselContainer.className = "basic-carousel-container";

      let carouselTrack = document.createElement('div');
      carouselTrack.className = "basic-carousel-track";

      carouselContainer.appendChild(carouselTrack);

      while (target.childNodes.length > 0) {
        carouselTrack.appendChild(target.childNodes[0])
      }

      target.appendChild(carouselContainer);
    }

    // Set the carousel track width
    function setTrackWidth(){
      let carouselTrack = document.querySelector('.basic-carousel-track');
      if (carouselTrack) {
        let carouselBlocks = document.querySelectorAll('.basic-carousel-block');
        if (carouselBlocks.length > 0) {
          let trackWidth = 0;
          for (var i = 0; i < carouselBlocks.length; i++) {
            trackWidth += carouselBlocks[i].offsetWidth;
          }
          carouselTrack.style.width = trackWidth + "px";
        }
      }
    }

    // Set the carousel children class name(s)
    function setChildClasses(els){
      for (var i = 0; i < els.length; i++) {
        els[i].className += ' basic-carousel-block';
      }
    }

    // Set the width of the carousels children
    function setChildrenWidth(els, width){
      if (width !== parseInt(width, 10)) {
        width = 500;
      }

      for (var i = 0; i < els.length; i++) {
        els[i].style.width = width + "px";
      }
    }

    // Add/remove prev/next button
    function setPrevNextButton(carousel){
      trackEl = document.querySelector('.basic-carousel-track');
      carouselContainer = document.querySelector('.basic-carousel-container');

      if (carousel.options.slideAmount !== parseInt(carousel.options.slideAmount, 10)) {
        carousel.options.slideAmount = 15;
      }

      if (trackEl.offsetWidth > carouselContainer.offsetWidth) {
        if (!document.querySelector('.basic-carousel-prev') || !document.querySelector('.basic-carousel-next')){
          let carouselInitClass = document.querySelector('.basic-carousel-init');

          let prevButton = document.createElement('button');
          prevButton.className = "basic-carousel-prev";
          prevButton.style.opacity = 0.5;

          let nextButton = document.createElement('button');
          nextButton.className = "basic-carousel-next";

          carouselInitClass.insertBefore(prevButton, carouselInitClass.firstChild);
          carouselInitClass.appendChild(nextButton);

          prevButton.addEventListener("click", function(){animateTrack("left")});

          nextButton.addEventListener("click", function(){animateTrack("right")});

          function animateTrack(direction){
            let pixel = 0;
            let time = setInterval(animateTrack, 10);

            function animateTrack(){
              if(pixel == carousel.options.slideAmount){
                clearInterval(time);
              }else{
                pixel++;
                if (direction == "left") {
                  trackEl.style.left = trackEl.offsetLeft + carousel.options.slideAmount + "px";
                }else if(direction == "right"){
                  trackEl.style.left = trackEl.offsetLeft - carousel.options.slideAmount + "px";
                }
                calibrateTrack() ? clearInterval(time) : false;
              }
            }
          }
        }
      }else{
        if (document.querySelector('.basic-carousel-prev') || document.querySelector('.basic-carousel-next')){
          document.querySelector('.basic-carousel-prev').parentNode.removeChild(document.querySelector('.basic-carousel-prev'));
          document.querySelector('.basic-carousel-next').parentNode.removeChild(document.querySelector('.basic-carousel-next'));
          document.querySelector('.basic-carousel-track').style.left = null;
        }
      }
    }

    // Get the individual elements of the carousel
    function getCarouselEls(target){
      let targetChildren = target.children;

      if (targetChildren) {
        if (targetChildren.length > 0) {
          return targetChildren;
        }else{
          return false;
        }
      }

    }

    // Find the target and return true if found
    function getTarget(el){
      if(document.getElementById(el)){
        return true;
      }
    }

    // Calibrate the track
    function calibrateTrack(){
      let trackEl = document.querySelector('.basic-carousel-track');
      let carouselContainer = document.querySelector('.basic-carousel-container');
      let prevButton = document.querySelector('.basic-carousel-prev');
      let nextButton = document.querySelector('.basic-carousel-next');

      if (trackEl.offsetLeft > 0) {
        trackEl.style.left = 0;
        if (prevButton) prevButton.style.opacity = 0.5;
        return true;
      }else if (prevButton) prevButton.style.opacity = 1;

      if (trackEl.offsetLeft < (carouselContainer.offsetWidth - trackEl.offsetWidth)) {
        if (prevButton || nextButton) {
          trackEl.style.left = carouselContainer.offsetWidth - trackEl.offsetWidth + "px";
          nextButton.style.opacity = 0.5;
        }else{
          trackEl.style.left = 0;
        }
        return true;
      }else if (nextButton) nextButton.style.opacity = 1;

      if (trackEl.offsetLeft == 0 && prevButton){
        prevButton.style.opacity = 0.5;
      }

      if (trackEl.offsetLeft == (carouselContainer.offsetWidth - trackEl.offsetWidth) && nextButton){
        nextButton.style.opacity = 0.5;
      }

    }

    // Setup events
    function initializeEvents(carousel) {

      // On window resize recalibrate the track, set if prev/next buttons are needed
      window.addEventListener('resize', function(){
        calibrateTrack();
        setPrevNextButton(carousel);
      }, false);

      // Find track and add mouse/touch events to it
      if (document.querySelector('.basic-carousel-track')) {
        trackEl = document.querySelector('.basic-carousel-track');
        carouselContainer = document.querySelector('.basic-carousel-container');

        trackEl.addEventListener('mousedown', trackMouseDown, false);
        trackEl.addEventListener('touchstart', trackMouseDown, { passive: false });
        window.addEventListener('mouseup', trackMouseUp, false);
        window.addEventListener('touchend', trackMouseUp, { passive: false });
      }

      // When the mouse click/touch is lifted, remove mousemove/touchmove event
      function trackMouseUp(){
        window.removeEventListener('mousemove', trackMove, true);
        window.removeEventListener('touchmove', trackMove, { passive: false });
      }

      // When mouse click is held down/touch, add mousemove/touchmove event
      function trackMouseDown(e){
        if (e.touches) {
          x_pos = e.touches[0].clientX - trackEl.offsetLeft;
        }else x_pos = e.clientX - trackEl.offsetLeft;

        window.addEventListener('mousemove', trackMove, true);
        window.addEventListener('touchmove', trackMove, { passive: false });
      }

      // While dragging the track with the mouse click held down/touch, move the track with the mouse/touch
      function trackMove(e){
        e.preventDefault();

        if (trackEl.offsetWidth > carouselContainer.offsetWidth) {
          if (e.touches) {
            trackEl.style.left = (e.touches[0].clientX - x_pos) + 'px';
          }else trackEl.style.left = (e.clientX - x_pos) + 'px';


          if (trackEl.offsetLeft > 0) {
            trackEl.style.left = 0;
            document.querySelector('.basic-carousel-prev').style.opacity = 0.5;
          }else document.querySelector('.basic-carousel-prev').style.opacity = 1;

          if (trackEl.offsetLeft < (carouselContainer.offsetWidth - trackEl.offsetWidth)) {
            trackEl.style.left = carouselContainer.offsetWidth - trackEl.offsetWidth + "px";
            document.querySelector('.basic-carousel-next').style.opacity = 0.5;
          }else document.querySelector('.basic-carousel-next').style.opacity = 1;
        }

      }

      // Solely for reference
      if (this.closeButton) {
        this.closeButton.addEventListener('click', this.close.bind(this));
      }

    }

  }());
