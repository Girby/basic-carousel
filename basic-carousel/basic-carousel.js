(function() {

    // Define our constructor
    this.BasicCarousel = function() {

      // Create global element references
      this.target = null;
      this.initClass = 'basic-carousel-init';

      // Define option defaults
      var defaults = {
        target : this.target,
        width: 200
      }

      // Create options by extending defaults with the passed in arugments
      if (arguments[0] && typeof arguments[0] === "object") {
        this.options = extendDefaults(defaults, arguments[0]);
      }

      // Check to see if the target el exists
      if(this.options.target !== null && this.options.target !== "") {
        if(findTarget(this.options.target)){
          buildOut.call(this);
        }else this.target = "Error";
      }else this.target = "Error";
    }

    // Public Methods

    BasicCarousel.prototype.open = function() {

    }

    // Private Methods

    function buildOut() {
      this.target = document.getElementById(this.options.target);

      this.target.className += " " + this.initClass;

      setChildrenWidth(getCarouselEls(this.target), this.options.width);
      setChildClasses(getCarouselEls(this.target));
      createCarouselInnerEls(getCarouselEls(this.target), this.target);
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

    // Set the carousel children class name(s)
    function setChildClasses(els){
      for (var i = 0; i < els.length; i++) {
        els[i].className += ' basic-carousel-block';
      }
    }

    // Set the width of the carousels children
    function setChildrenWidth(els, width){
      // Remove any strings from the width var
      width = width.replace(/\D/g,'');

      for (var i = 0; i < els.length; i++) {
        els[i].style.width = width + "px";
      }
    }

    // Get the individual elements of the carousel
    function getCarouselEls(target){
      let targetChildren = target.children;

      if (targetChildren.length > 0) {
        return targetChildren;
      }else{
        throw new Error("cannot find carousel elements.")
      }
    }

    // Find the target and return true if found
    function findTarget(el){
      if(document.getElementById(el)){
        return true;
      }
    }

    // Setup events
    function initializeEvents() {

      if (this.closeButton) {
        this.closeButton.addEventListener('click', this.close.bind(this));
      }

      if (this.overlay) {
        this.overlay.addEventListener('click', this.close.bind(this));
      }

    }

  }());
