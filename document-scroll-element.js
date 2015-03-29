var getDocumentScrollElement = (function() {
	
	function _getDocumentScrollElement() {
		
		var body = this.body;
		
		//create a temporary element that is slightly taller than the window that will allow for scrolling;
		//and append element to body
		var targetHeight = Math.max(window.innerHeight, this.clientHeight) + 1;
		var elm = this.createElement("div");
		elm.setAttribute("style", "height:" + targetHeight + "px;width:1px");
		body.appendChild(elm);
		
		//try scrolling the body element by one pixel
		var startingScrollTop = body.scrollTop;
		var targetScroll = startingScrollTop + 1
		body.scrollTop = targetScroll;
		
		//if scrolling on `document.body` element worked, checking the `scrollTop` getter will return the the expected value, confirming this is the scrollable element;
		//otherwise, `document.documentElement` is likely the scrollable element.
		var scrollElement = this.scrollElement = body.scrollTop === targetScroll ? body : this.documentElement;
		
		//reset the scroll, and remove the temporary element
		scrollElement.scrollTop = startingScrollTop;
		body.removeChild(elm);
		return scrollElement;
	}
	
	function main(callback) {
	
		callback = typeof callback === "function" ? callback : function() {};
		
		if (window.scrollElement) {
			return callback(window.scrollElement);
		}
		
		var callbackWithElement = function() {
			return callback(_getDocumentScrollElement.bind(document)());
		};
		
		if (["interactive", "complete"].indexOf(document.readyState) !== -1) {
			return callbackWithElement();
		}
		
		document.addEventListener("DOMContentLoaded", callbackWithElement);
	}
	
	return main;
}());

if (typeof module === "object") {
	module.exports = getDocumentScrollElement;
}