var ua = (function(u){
	return {
		Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1) || u.indexOf("ipad") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1) || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1) || u.indexOf("kindle") != -1 || u.indexOf("silk") != -1 || u.indexOf("playbook") != -1,
		Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1) || u.indexOf("iphone") != -1 || u.indexOf("ipod") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1) || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1) || u.indexOf("blackberry") != -1
	}
})(window.navigator.userAgent.toLowerCase());

$(function() {
	var $body = $('body');
	var $win = $(window);
	var $winHeight = Math.floor($win.height());
	var $winWidth = Math.floor($win.width());

	$.fn.slidemv = function() {
		var $mv = this;
		var $list_mv = $('#js-list-mv');
		var current = 0;
		var length = $list_mv.find('li').length;
		var timerId = null;
		var first_flg = true;
		var delay = 5000;
		var touchmove_flg = false;
	
		function autoChangeDevice() {
			current++;
			if (current >= length) {
				current = 0;
			}
			
			setDevice();
		}
		
		function setDevice() {
			clearInterval(timerId);
			timerId = null;
			$list_mv.find('li').removeClass('current').eq(current).addClass('current');
			timerId = setInterval(autoChangeDevice, delay);
		}

		function screenTest() {
			clearInterval(timerId);
			timerId = setInterval(autoChangeDevice, delay);
			setDevice();
		}
		screenTest();
	}

	$win.on('resize load', function() {
		$winHeight = Math.floor($win.height());
		$winWidth = Math.floor($win.width());
	})


	$win.on('load', function() {
		// MV
		$('#sec-mv').slidemv();
	});


	if (ua.Mobile) {
		$.fn.fullmv = function() {
			var $mv = $(this);
			function resizeMv() {
				$mv.css({
					width: $winWidth,
					height: $winHeight
				});
			}
			$win.on('resize', resizeMv);
			resizeMv();
		}
		$win.on('load', function() {
			$('#sec-mv').fullmv();
		});
	}
	
	$win.on('load', function () {
		$('.tit-mv').addClass('js-tit-lod');
	});

	$(".js-btn-select").on("click", function () {
		$(this).toggleClass("is-open");
		$(this).next().stop().slideToggle("200");
	});
});