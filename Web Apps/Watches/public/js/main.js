// my JavaScripts

'use strict';

// script to add swipe functionality to BS carousel ===================================

    $(document).ready(function() {
		   $("#myCarousel").swiperight(function() {
			  $(this).carousel('prev');
			});
		   $("#myCarousel").swipeleft(function() {
			  $(this).carousel('next');
		   });
		});

// script to address modal backdrop bug for tall modals ===================================

    $('body').on('shown.bs.modal', '.modal', function(){
			var windowHeight = parseInt($(window).height());
			var height = parseInt($('.modal-content').height());
			if(windowHeight > height) height = windowHeight;
		$('.modal-backdrop').height(height+600);
		});

// isotope  ===================================================================================================

    // initializes isotope and defines the container that its in
		$(window).load(function(){
				var $container = $('.portfolioContainer');
				$container.isotope({
					filter: '*',
					animationOptions: {
						duration: 750,
						easing: 'linear',
						queue: false
					}
				});

				// used to dynamically recalcuate when the window is resized
				$(window).resize(function () {
					$container
					  .isotope('reLayout');
					return false;
				});

			 	// define filter categories and tie it to a click event
				$('.portfolioFilter a').click(function(){
					$('.portfolioFilter .current').removeClass('current');
					$(this).addClass('current');

					var selector = $(this).attr('data-filter');
					$container.isotope({
						filter: selector,
						animationOptions: {
							duration: 750,
							easing: 'linear',
							queue: false
						}
					 });
					 return false;
				});
			});

// mobile device detection ==================================================================================

    if (Modernizr.touch) {
			$('#footerText').css('opacity', '1');
			$('#footerText2').css('opacity', '1');
		} else {
			$('#footerText').css('opacity', '0');
			$('#footerText2').css('opacity', '0');
		}

// parallax initiation ======================================================================================

		$(document).ready(function() {
			$('.separator1').parallax("50%", 0.2);
		});

// play video button for mobile devices ========================================================================

   		$('#mobileBtn').click(function() {
   			$('#backgroundVid').get(0).play();
   			$('#mobileBtn').addClass('hidden');
   		});

// external video play button =====================================================================================

   		$('#vidBtn').click(function() {
   			$('#backgroundVid2').get(0).play();
   			$('#vidBtn').addClass('hidden');
   		});

// detect elements are in the viewport on a scroll event =========================================================

			var $animation_elements = $('.scrollAnim');
			var $window = $(window);

			function check_if_in_view() {
					var window_height = $window.height();
					var window_top_position = $window.scrollTop();
					var window_bottom_position = (window_top_position+ window_height);

					$.each($animation_elements, function () {
							var $element = $(this);
							var element_height = $element.outerHeight();
							var element_top_position = $element.offset().top;
							var element_bottom_position = (element_top_position + element_height);

							//check to see if this current container is within the viewport
							if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
								$element.addClass('inView');
							} else {
								$element.removeClass('inView');
							}
					});
			}

			$window.on('scroll resize', check_if_in_view);
			$window.trigger('scroll');

// auto-close bootstrap dropdown menu  =============================================================================

      $('.nav a').on('click', function(){
      	if($('.navbar-toggle').css('display') != 'none')
          $('.navbar-toggle').click();
      });

// slideout menu initialization and options  ==================================================================

      var slideout = new Slideout({
        'panel': document.getElementById('panel'),
        'menu': document.getElementById('menu'),
        'padding': 256,
        'tolerance': 70,
        'fx': 'ease-in-out'
      });

      // toggle button
      document.querySelector('.slideout-button').addEventListener('click', function() {
          slideout.toggle();
      });

     // fadeout left on close & recycle
      slideout.on('beforeclose', function() {
        document.querySelector('.slideout-menu').classList.add('fadeOutLeftBig');
      });
      slideout.on('beforeopen', function() {
        document.querySelector('.slideout-menu').classList.remove('fadeOutLeftBig');
      });

// ==========================================================================
