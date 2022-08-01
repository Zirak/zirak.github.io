/*global setTimeout*/
const canvas = document.getElementById('dots');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    const { height, width } = document.body.getBoundingClientRect();
    canvas.height = height;
    canvas.width = width;
}
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

let dots = [];
const Dot = {
    draw(dot, ctx) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2, true);
        ctx.closePath();

        ctx.fillStyle = dot.colour;
        ctx.fill();
    },

    step(dot) {
        if (dot.radius >= dot.maxRadius && !dot.killTimeout) {
            let origDelta = dot.radiusDelta;
            dot.radiusDelta = 0;

            dot.killTimeout = setTimeout(() => {
                dot.radiusDelta = origDelta * -1;
            }, 1500 / dots.length);
        }

        dot.radius += dot.radiusDelta;
    },
};

setTimeout(function addDotInterval() {
    addDot();
    setTimeout(addDotInterval, 3000);
});

setTimeout(function render() {
    setTimeout(render, 60);

    dots = dots.filter((dot) => dot.radius > 0);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dots.forEach((dot) => {
        Dot.draw(dot, ctx);
        Dot.step(dot);
    });
});

function addDot() {
    dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        colour: randomRGBA(),

        radius: 1,
        maxRadius: Math.random() * 7 + 20,
        radiusDelta: Math.random() + 0.1,
    });

    function randomRGBA() {
        const rgb = [randomColour(), randomColour(), randomColour()];
        return `rgba(${rgb}, 0.1)`;
    }

    function randomColour() {
        return Math.floor(Math.random() * 0xff);
    }
}
