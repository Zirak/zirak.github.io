/*global setTimeout*/

var canvas = document.getElementById('dots'),
    ctx = canvas.getContext('2d');

function resizeCanvas () {
	var bbox = document.body.getBoundingClientRect();
	canvas.height = bbox.height;
	canvas.width = bbox.width;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

var dots = [];
var Dot = {
	draw : function (dot, ctx) {
		ctx.beginPath();
		ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI*2, true);
		ctx.closePath();

		ctx.fillStyle = dot.colour;
		if (ctx.fillStyle !== dot.colour) {
			console.warn(dot);
		}
		ctx.fill();
	},

	step : function (dot) {
		var origDelta;

		if (dot.radius >= dot.maxRadius && !dot.killTimeout) {
			origDelta = dot.radiusDelta;
			dot.radiusDelta = 0;

			dot.killTimeout = setTimeout(function () {
				dot.radiusDelta = origDelta * -1;
			}, 2000 * 1/dots.length);
		}

		dot.radius += dot.radiusDelta;
	}
};

setTimeout(function addDotInterval () {
    addDot();
	setTimeout(addDotInterval, 3000);
});

setTimeout(function render () {
	setTimeout(render, 60);

	dots = dots.filter(function (dot) {
		return dot.radius > 0;
	});

	ctx.clearRect(0, 0, canvas.height, canvas.width);

	dots.forEach(function (dot) {
		Dot.draw(dot, ctx);
		Dot.step(dot);
	});
});

function addDot () {
    dots.push({
        x : Math.random() * canvas.width,
        y : Math.random() * canvas.height,
        colour : randomColour(),

		radius : 1,
		maxRadius : Math.random() * 7 + 20,
		radiusDelta : Math.random()
    });

	console.log(dots.slice());

    function randomColour () {
        return '#' + [randHex(), randHex(), randHex()].join('');
    }
    function randHex () {
        var hex = Math.floor(Math.random()*0xff).toString(16);
		return ('00' + hex).slice(-2);
    }
}
