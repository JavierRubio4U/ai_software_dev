$(function() {

    // Load product data from database *****************************************

    // Get data about our products from our Mongo database.
    $.getJSON( "/users/products", function( data ) {

        watch_data = data;

        renderWatch1Page(watch_data);
        renderWatch2Page(watch_data);
        renderWatch3Page(watch_data);

    });

    // Generate content for feature watch #1.
	function renderWatch1Page(data) {

		var page1 = $('.watch1'),
            container1 = $('.watch1Stuff')

		if(data.length) {
			data.forEach(function (item) {
				if(item._id == "57af142ffb2fa22659e55c1a") {
					container1.find('h2').text(item.name);
					container1.find('img').attr('src', item.image.large);
					container1.find('#price').text(item.price);
					container1.find('#description').text(item.description);
					container1.find('#bezel').text(item.specs.bezel);
					container1.find('#strap').text(item.specs.strap);
					container1.find('#dialcolor').text(item.specs.dialcolor);
					container1.find('#movement').text(item.specs.movement);
					container1.find('#waterproof').text(item.specs.waterproof);
					container1.find('#watchstyle').text(item.specs.watchstyle);
				}
			});
		}
	}

    // Generate content for feature watch #2.
    function renderWatch2Page(data) {

        var page2 = $('.watch2'),
            container2 = $('.watch2Stuff')

        if(data.length) {
            data.forEach(function (item) {
                if(item._id == "57af142ffb2fa22659e55c18") {
                    container2.find('h2').text(item.name);
                    container2.find('img').attr('src', item.image.large);
                    container2.find('#price').text(item.price);
                    container2.find('#description').text(item.description);
                    container2.find('#bezel').text(item.specs.bezel);
                    container2.find('#strap').text(item.specs.strap);
                    container2.find('#dialcolor').text(item.specs.dialcolor);
                    container2.find('#movement').text(item.specs.movement);
                    container2.find('#waterproof').text(item.specs.waterproof);
                    container2.find('#watchstyle').text(item.specs.watchstyle);
                }
            });
        }
    }

    // Generate content for feature watch #3.
    function renderWatch3Page(data) {

        var page3 = $('.watch3'),
            container3 = $('.watch3Stuff')

        if(data.length) {
            data.forEach(function (item) {
                if(item._id == "57af142ffb2fa22659e55c1b") {
                    container3.find('h2').text(item.name);
                    container3.find('img').attr('src', item.image.large);
                    container3.find('#price').text(item.price);
                    container3.find('#description').text(item.description);
                    container3.find('#bezel').text(item.specs.bezel);
                    container3.find('#strap').text(item.specs.strap);
                    container3.find('#dialcolor').text(item.specs.dialcolor);
                    container3.find('#movement').text(item.specs.movement);
                    container3.find('#waterproof').text(item.specs.waterproof);
                    container3.find('#watchstyle').text(item.specs.watchstyle);
                }
            });
        }
    }

});
