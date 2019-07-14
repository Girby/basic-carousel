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
      console.log(this);
      
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

    function findTarget(el){      
      if(document.getElementById(el)){
        return true;
      }
    }
  
    function initializeEvents() {

      if (this.closeButton) {
        this.closeButton.addEventListener('click', this.close.bind(this));
      }
  
      if (this.overlay) {
        this.overlay.addEventListener('click', this.close.bind(this));
      }

    }
  
  }());