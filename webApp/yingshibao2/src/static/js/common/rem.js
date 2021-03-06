/**
 * @Author: Arvay
 * @Date:   2017年8月3日21:23:01
 * @Last modified by:   Arvay
 * @Last modified time: 2017年8月3日21:23:03
 */
	(function(doc, win) {
		var docEl = doc.documentElement,
			resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
			recalc = function() {
				var clientWidth = docEl.clientWidth;
				if(!clientWidth) return;
				if(clientWidth >= 640) {
					docEl.style.fontSize = '100px';
				} else {
					docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
				}
			};

		if(!doc.addEventListener) return;
		win.addEventListener(resizeEvt, recalc, false);
		doc.addEventListener('DOMContentLoaded', recalc, false);
	})(document, window);
