$(function() {
	var $body = $('body');
	var $win = $(window);
	var scroll_y = $win.scrollTop();
	var winHeight = Math.floor($win.height());

	// 	smooth scroll
	$.smoothScroll = function(_o) {
		var $elmn = $('a[href^="#"]');
		var time = 1000;
		$.extend($.easing, { easeOutExpo: function (x, t, b, c, d) { return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b; }});

		$elmn.on('click',function() {
			var href = $(this).attr('href');
			if (href != '#') {
				var pos_y = $(href).offset().top;
				$('html, body').animate({
					scrollTop: pos_y
				}, time, 'easeOutExpo');
			}

			return false;
		});
	}
	$.smoothScroll();

	// HeaderをFixedする
	$.headerFixed = function() {
		var class_fixed = 'is-fixed';

		$win.on('scroll', function() {
			if (scroll_y <= 80) {
				$body.removeClass(class_fixed);
			} else {
				$body.addClass(class_fixed);
			}
		});
	}

	$.fn.scrollFade = function() {
		$(this).each(function(i) {
			
			var $group = $(this);
			var $item = $('.js-sf-item', $group);
			var offsetY = $group.offset().top;
			var eventName = 'scroll.' + i;
			$win.on(eventName, selfVisible);

			function selfVisible() {
				if (offsetY < scroll_y + winHeight * 0.9) {
					$item.each(function(k) {
						setTimeout(function() {
							$item.eq(k).addClass('sf-visible');
						}, k * 100);
					});

					$win.off(eventName);
				}
			}
		});
	}
	
	$.toggleNav = function () {
		var _btnNav = $('.nav-button');
		var _body = $('body');
		var _container = $('.global-nav');
		var _event = 'click';
		var _status = 'close';

		_btnNav.on(_event, function () {

			if (_status == 'close') {
				_status = 'open';
				_container.slideDown(200);
				_body.addClass('is-menu-open');
			} else if (_status == 'open') {
				_status = 'close';
				_container.slideUp(200);
				_body.removeClass('is-menu-open');
			}

		})

		$('.global-nav-in a').on('click', function(){
			if (window.innerWidth <= 768) {
				_btnNav.click();
			}
		});
	}


	// Windowイベント
	$win.on('load', function() {
		$.headerFixed();
		$('.js-sf-group').scrollFade();

		$.toggleNav();
	});
	$win.on('scroll', function() {
		scroll_y = $win.scrollTop();
	});

});
