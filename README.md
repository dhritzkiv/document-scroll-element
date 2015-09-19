## Note: this code is obsoleted by [mathiasbynens/document.scrollingElement](https://github.com/mathiasbynens/document.scrollingElement), which is closer polyfill for the [scrollingElement spec](https://developer.mozilla.org/en-US/docs/Web/API/document/scrollingElement), is more comprehensive, and handles edge-cases better.

# document-scroll-element

Different browsers scroll the page using different elements. For example, Firefox scrolls on `document.documentElement` (`<html>`), while Safari scrolls on `document.body` (`<body>`).

This function determines which document element is scrollable.

For example, in order to animate a scroll, it's often required you write:

	$('html, body').animate({scrollTop: 500}, 400);

Instead, you can write:

	$(document.scrollElement).animate({scrollTop: 500}, 400);
	
_Note: this does not require jQuery; the above is simply a common use-case_

# Usage

## getDocumentScrollElement([callback])

- automatically sets `document.scrollElement` to the correct scrolling element
- also accepts a callback function, where the sole argument is the scrolling element

_Note: this function is synchronous if called after the DOM's `readyState` is `interactive`, but asynchronous if called before, hence the ability to pass a callback._

## Example

	documentScrollElement(function(scrollElement) {
		console.log("scrollElement is:", scrollElement);
	});
	
	//later...
	
	document.scrollElement.scrollTop += 40;

# Installation

## Script tag

	<script src="path/to/document-scroll-element.js"></script>

This will add `getDocumentScrollElement` to the `window` object.

## Bower

	bower install document-scroll-element

## Browserify

### Install

	npm install document-scroll-element

### Require

	var getDocumentScrollElement = require("document-scroll-element");
	
# Compatibility

Tested in Chrome 41, Firefox 34, and Safari 8
	
# License 

MIT
