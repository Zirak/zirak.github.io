/*global setTimeout*/
var canvas = document.getElementById('dots'),
    ctx = canvas.getContext('2d');

function resizeCanvas () {
	var bbox = document.body.getBoundingClientRect();
	canvas.height = bbox.height;
	canvas.width = bbox.width;
}
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

var dots = [];
var Dot = {
	draw : function (dot, ctx) {
		ctx.beginPath();
		ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI*2, true);
		ctx.closePath();

		ctx.fillStyle = dot.colour;
		ctx.fill();
	},

	step : function (dot) {
		var origDelta;

		if (dot.radius >= dot.maxRadius && !dot.killTimeout) {
			origDelta = dot.radiusDelta;
			dot.radiusDelta = 0;

			dot.killTimeout = setTimeout(function () {
				dot.radiusDelta = origDelta * -1;
			}, 1500 * 1/dots.length);
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

	ctx.clearRect(0, 0, canvas.width, canvas.height);

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
		radiusDelta : Math.random() + 0.1
    });

    function randomColour () {
        return 'rgba(' +
			[randColour(), randColour(), randColour()].join(', ') +
			', 0.1)';

    }
    function randColour () {
        return Math.floor(Math.random()*0xff);
    }
}
