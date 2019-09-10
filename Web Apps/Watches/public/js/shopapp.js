$(function () {

	// Globals variables *************************************************

		// 	An array containing objects with information about the products.
		var products = [],

		// Our filters object will contain an array of values for each filter

		// Example:
		// filters = {
		// 		"manufacturer" = ["Apple","Sony"],
		//		"storage" = [16]
		//	}
		filters = {};

		// cart objects that make up the shopping cart
		var cartitem = {}, cart = []; // list of shopping cart objects
		var count = 0;
		var removeitem;

	//	Checkbox filtering **************************************************

	var checkboxes = $('.all-products input[type=checkbox]');

	checkboxes.click(function () {

		var that = $(this),
			specName = that.attr('name');

		// When a checkbox is checked we need to write that in the filters object;
		if(that.is(":checked")) {

			// If the filter for this specification isn't created yet - do it.
			if(!(filters[specName] && filters[specName].length)){
				filters[specName] = [];
			}

			//	Push values into the chosen filter array
			filters[specName].push(that.val());

			// Change the url hash;
			createQueryHash(filters);
		}

		// When a checkbox is unchecked we need to remove its value from the filters object.
		if(!that.is(":checked")) {

			if(filters[specName] && filters[specName].length && (filters[specName].indexOf(that.val()) != -1)){

				// Find the checkbox value in the corresponding array inside the filters object.
				var index = filters[specName].indexOf(that.val());

				// Remove it.
				filters[specName].splice(index, 1);

				// If it was the last remaining value for this specification,
				// delete the whole array.
				if(!filters[specName].length){
					delete filters[specName];
				}
			}

			// Change the url hash;
			createQueryHash(filters);
		}
	});


	// When the "Clear all filters" button is pressed change the hash to '#' (go to the home page)
	$('.filters button').click(function (e) {
		e.preventDefault();
		window.location.hash = '#';
    	document.getElementById('view-cart').scrollIntoView();
	});

	// Close single product page modal
	var singleProductPage = $('.modal-header .close');
	singleProductPage.on('click', function (e) {

			var clicked = $(e.target);

			// Clear filters when modal close button clicked.
			if (clicked.hasClass('close')) {
				// Change the url hash with the last used filters.
				createQueryHash(filters);
			}
	});

	// Load product data from database *****************************************
	$.getJSON( "products.json", function( data ) {

		// Write the data into our global variable.
		products = data;

		// Call a function to create HTML for all the products.
		generateAllProductsHTML(products);

		// Manually trigger a hashchange to start the app.
		$(window).trigger('hashchange');
	});

  
	// Re-render site on every hash change event **********************************

	// An event handler with calls the render function on every hashchange.
	// The render function will show the appropriate content of out page.
	$(window).on('hashchange', function(){
		render(decodeURI(window.location.hash));
	});

	// Render function *************************************************************

	function render(url) {

		// Get the keyword from the url.
		var temp = url.split('/')[0];

		// Hide whatever page is currently shown.
		$('.main-content .page').removeClass('visible');


		var	map = {

			// The "Homepage".
			'': function() {

				// Clear the filters object, uncheck all checkboxes, show all the products
				filters = {};
				checkboxes.prop('checked',false);

				renderProductsPage(products);
			},

			// Single products modal view
			'#product': function() {

				// Get the index for the product we want to show in the modal window
				var index = url.split('#product/')[1].trim();
				renderSingleProductPage(index, products);
			},

			// Page with filtered products
			'#filter': function() {

				// Grab the string after the '#filter/' keyword. Call the filtering function.
				url = url.split('#filter/')[1].trim();

				// Try and parse the filters object from the query string.
				try {
					filters = JSON.parse(url);
				}
					// If it isn't a valid json, go back to homepage ( the rest of the code won't be executed ).
				catch(err) {
					window.location.hash = '#';
					return;
				}

				renderFilterResults(filters, products);
			}

		};

		// Execute the needed function depending on the url keyword (stored in temp).
		if(map[temp]){
			map[temp]();
		}
	}

 	// App state update render functions **********************************************************

	// This function is called only once - on page load.
	// It fills up the products list via a handlebars template.
	// It recieves one parameter - the data we took from the database.
	function generateAllProductsHTML(data){

		var list = $('.all-products .products-list');

		var theTemplateScript = $("#products-template").html();
		//Compile the template​
		var theTemplate = Handlebars.compile (theTemplateScript);
		list.append (theTemplate(data));

		list.find('li').on('click', function(e) {
			e.preventDefault();

			var productIndex = $(this).data('index');
			window.location.hash = 'product/' + productIndex;
		})
	}

	// This function receives an object containing all the product we want to show.
	function renderProductsPage(data){

		var page = $('.all-products'),
			allProducts = $('.all-products .products-list > li');

		// Hide all the products in the products list.
		allProducts.addClass('hidden');

		// Iterate over all of the products.
		// If their ID is somewhere in the data object remove the hidden class to reveal them.
		allProducts.each(function () {

			var that = $(this);

			data.forEach(function (item) {
				if(that.data('index') == item._id){
					that.removeClass('hidden');
				}
			});
		});

		// Show the page itself.
		// (the render function hides all pages so we need to show the one we want).
		page.addClass('visible');

	}

	// Opens up and populates the single product page modal view.
	function renderSingleProductPage(index, data) {

		var page = $('.modal'),
			container = $('.modal-body');
		var id;
		var name;
		var price;

		if(data.length) {
			data.forEach(function (item) {
				if(item._id == index) {
					container.find('h2').text(item.name);
					container.find('img').attr('src', item.image.large);
					container.find('#price').text(item.price);
					container.find('p').text(item.description);
					container.find('#bezel').text(item.specs.bezel);
					container.find('#strap').text(item.specs.strap);
					container.find('#dialcolor').text(item.specs.dialcolor);
					container.find('#movement').text(item.specs.movement);
					container.find('#waterproof').text(item.specs.waterproof);
					container.find('#watchstyle').text(item.specs.watchstyle);
					id = item._id;
					name = item.name;
					price = item.price;
				}
			});
		}

		$('#singleProductPg').modal();
		$('#cartBtn').one("click", function() {
			addToCart(id, name, price);
		});
	}


	// Find and render the filtered data results. Arguments are:
	// filters - our global variable - the object with arrays about what we are searching for.
	// products - an object with the full products list (from product.json).
	function renderFilterResults(filters, products){

			// This array contains all the possible filter criteria.
		var criteria = ['watchstyle','dialcolor','strap','waterproof'],
			results = [],
			isFiltered = false;

		// Uncheck all the checkboxes.
		// We will be checking them again one by one.
		checkboxes.prop('checked', false);

		criteria.forEach(function (c) {

			// Check if each of the possible filter criteria is actually in the filters object.
			if(filters[c] && filters[c].length){

				// After we've filtered the products once, we want to keep filtering them.
				// That's why we make the object we search in (products) to equal the one with the results.
				// Then the results array is cleared, so it can be filled with the newly filtered data.
				if(isFiltered){
					products = results;
					results = [];
				}

				// In these nested 'for loops' we will iterate over the filters and the products
				// and check if they contain the same values (the ones we are filtering by).

				// Iterate over the entries inside filters.criteria (remember each criteria contains an array).
				filters[c].forEach(function (filter) {

					// Iterate over the products.
					products.forEach(function (item){

						// If the product has the same specification value as the one in the filter
						// push it inside the results array and mark the isFiltered flag true.

						if(typeof item.specs[c] == 'number'){
							if(item.specs[c] == filter){
								results.push(item);
								isFiltered = true;
							}
						}

						if(typeof item.specs[c] == 'string'){
							if(item.specs[c].toLowerCase().indexOf(filter) != -1){
								results.push(item);
								isFiltered = true;
							}
						}

					});

					// Here we can make the checkboxes representing the filters true,
					// keeping the app up to date.
					if(c && filter){
						$('input[name='+c+'][value='+filter+']').prop('checked',true);
					}
				});
			}

		});

		// Call the renderProductsPage.
		// As it's argument give the object with filtered products.
		renderProductsPage(results);
	}


	// Translate hash to URL string **************************************************

	// Get the filters object, turn it into a string and write it into the hash.
	function createQueryHash(filters){

		// Here we check if filters isn't empty.
		if(!$.isEmptyObject(filters)){
			// Stringify the object via JSON.stringify and write it after the '#filter' keyword.
			window.location.hash = '#filter/' + JSON.stringify(filters);
		}
		else{
			// If it's empty change the hash to '#' (the homepage).
			window.location.hash = '#';
      		document.getElementById('view-cart').scrollIntoView();
		}
	}

	// Shopping Cart functionality **********************************************

	// method to add items to the cart
	function addToCart(id, name, price) {

		cartitem.id = id;
		cartitem.name = name;
		cartitem.price = price;
		var temp = price;
		temp = temp.replace(/,/g, "");
		cartitem.subprice = parseFloat(temp);

		cart[count] = cartitem;
		cartitem ={};
		count = count + 1;

		console.log(cart);
		renderCart(cart);
	}

	// render the contents of the shopping cart
	function renderCart(cart) {

		var sub = 0.00;
		for (var i = 0; i < cart.length; i++) {
			sub = sub + cart[i].subprice;
		}

		var tman = sub * 0.08;
		var tot = sub + tman;
		var subtotal = sub.toFixed(2)
		var tax = tman.toFixed(2);
		var total = tot.toFixed(2);

		$('.cart-list').empty();
		if (cart.length > 0) {
			var itemindex = 0;
			cart.forEach(function (item) {
				$('#cart .cart1 ul').append('<li><h4 id="itemname">'+item.name+'</h4>&#36;<span id="itemprice">'+item.price+'</span></li><button id="removeBtn" data-remove="'+itemindex+'" type="button" class="btn btn-default btn-sm removeBtn">Remove from Cart</button>');
				itemindex++;
			});

		}

		if (cart.length == 0) {

			$('#cart .cart1 #cart-note').append('No items in your cart!');

		} else {
			$('#cart-note').empty();
		}

		// listeners for the remove item buttons
		var removeButtons = $('.removeBtn');
		removeButtons.one("click", function() {
			removeitem = $(this).attr('data-remove');
			console.log("remove item");
			console.log(removeitem);
			removeFromCart(cart, removeitem);
		});

		// calculate and display shopping cart totals
		var page = $('#cart'),
			container = $('.cart1');
		container.find('#subtotal').text(subtotal);
		container.find('#tax').text(tax);
		container.find('#total').text(total);
	}

	// method to remove items from the shopping cart
	function removeFromCart(cart, removeitem) {

		if (removeitem > -1) {
			cart.splice(removeitem, 1);
		}

		renderCart(cart);
	}

	// listener methods to control display of the shopping cart

	$('.viewCart').on("click", function() {
		$('.miniCart').addClass('active');
		$('.miniCart').addClass('slideInDown');
	});

	$('.closeCart').on("click", function() {
		$('.miniCart').removeClass('active');
		$('.miniCart').removeClass('slideInDown');
		if (cart.length == 0) {  // resets cart values
			cartitem = {};
			cart = [];
			count = 0;
		}
	});

	// navigation redirect upon clicking of the shopping cart checkout button
	// $('.checkout').on("click", function() {
	// 	 window.location="contact.html";
	// });

});
