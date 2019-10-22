# Basic Carousel

A very simple carousel similar to slick-carousel


## Demo

Link demo link here

## Setup

 Add the CSS file in your `<head>`
 
```html
<link rel="stylesheet" type="text/css" href="basic-carousel/basic-carousel.css">
```

Add the JS file just before the closing ```<body>```

```html
<script type="text/javascript" src="basic-carousel/basic-carousel.js"></script>
```
### JS

Set the target as the element id e.g.
```html
<div class="carousel-wrap" id="carousel">
 <div class="carousel-element"></div>
 ...
</div>
```

```javascript
var Carousel = new BasicCarousel({
    target: 'carousel'
});
```

## Settings

List of the current options available

Option | Type | Default | Description
------ | ---- | ------- | -----------
width | int | 500 | Sets the width for all of the carousel elements.
slideAmount | int| 15 | Sets how far the carousel moves when the Prev/Next buttons are clicked.

## Events

List of available events

## Methods

List of available methods

### GoTo

If you would like to go to a element in the carousel, use the following method:
```javascript
// Where index is, change to index of the element you want to go to.
YourElement.goTo(index);
```
