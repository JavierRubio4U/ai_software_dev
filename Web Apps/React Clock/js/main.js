// my Javascripts =========================

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

// isotope JS ==================================================================================================
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
			
// mobile device detection for hidden section toggle  ======================================================
		if (Modernizr.touch) {
			$('#mobileBtn').addClass('mobile');			
		} else {
			$('#mobileBtn').removeClass('mobile');
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

// ===============================================================================================================
  
                 
			