jQuery(document).ready(function($){

    var width, height, largeHeader, largeSubpage, canvas, ctx, circles, target, animateHeader = true;

    // define canvas size & initialize
    initHeader();
    addListeners();

    function initHeader() {

        if ($('section').hasClass('canvasItem')) {
            sub_height = $( ".fullHeader" ).height();
            sub_width = $( ".fullHeader" ).width();
            width = window.sub_width;
            height = window.sub_height;
            target = {x: 0, y: height};

            largeHeader = document.getElementById('aboutUs');
            largeHeader.style.height = height+'px';

            canvas = document.getElementById('beercanvas');
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext('2d');
        } else {
            sub_height = $( ".fullHeader" ).height();
            sub_width = $( ".fullHeader" ).width();
            width = window.sub_width;
            height = window.sub_height;
            target = {x: 0, y: height};

            canvas = document.getElementById('beercanvas');
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext('2d');
        }

        // create particles
        circles = [];
        for(var x = 0; x < width*0.5; x++) {
            var c = new Circle();
            circles.push(c);
        }
        animate();
    }

    // event handling
    function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function resize() {
        if ($('section').hasClass('canvasItem')){
            sub_height = $( ".fullHeader" ).height();
            sub_width = $( ".fullHeader" ).width();
            width = window.sub_width;
            height = window.sub_height;
            largeHeader.style.height = height+'px';
            canvas.width = width;
            canvas.height = height;
        } else {
            sub_height = $( ".fullHeader" ).height();
            sub_width = $( ".fullHeader" ).width();
            width = window.sub_width;
            height = window.sub_height;
            largeHeader.style.height = height+'px';
            canvas.width = width;
            canvas.height = height;
        }
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in circles) {
                circles[i].draw();
            }
        }
        requestAnimationFrame(animate);
    }

    // canvas manipulation
    function Circle() {
        var _this = this;

        // constructor
        (function() {
            _this.pos = {};
            init();
            console.log(_this);
        })();

        function init() {
            _this.pos.x = Math.random()*width;
            _this.pos.y = height+Math.random()*100;
            _this.alpha = 0.1+Math.random()*0.3;
            _this.scale = 0.1+Math.random()*0.3;
            _this.velocity = Math.random();
        }

        this.draw = function() {
            if(_this.alpha <= 0) {
                init();
            }
            _this.pos.y -= _this.velocity;
            _this.alpha -= 0.0005;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(70,70,70,'+ _this.alpha+')';
            ctx.fill();
        };
    }

});
