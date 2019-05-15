
main();

function main () {

    var pixelRatio = window.devicePixelRatio || 1;
    var canvas = document.createElement('canvas');
    canvas.setAttribute("id", "canvas");
    canvas.height=window.innerHeight * pixelRatio;
    canvas.width=window.innerWidth * pixelRatio;
    document.body.append(canvas);
    var ctx = canvas.getContext("2d");
    ctx.scale(pixelRatio, pixelRatio);

    const mouse = {
        x: null,
        y: null,
    }

    const colors = [
        "red",
        "green",
        "blue"
    ]

    window.addEventListener("mousemove", function(event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    })
    window.addEventListener('touchmove', function(e) {
        // Cache the client X/Y coordinates
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }, false);
    window.addEventListener('touchend', function(e) {
    // Cache the client X/Y coordinates
    mouse.x = undefined;
    mouse.y = undefined;
    // clearInterval(spawnId);
    }, false);
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    })

    function Particle(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.radians = Math.random() * Math.PI * 2;
        this.velocity = 0.05;
        this.distanceFromCenter = randomIntFromRange(50, 120);
        this.lastMouse = {
            x: x,
            y: y
        }

        this.update = () => {
            const lastPoint = {
                x: this.x,
                y: this.y
            }

            this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
            this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
            this.radians += this.velocity;
            this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
            this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
            this.draw(lastPoint);
        }

        this.draw = (lastPoint) => {
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.radius;
            ctx.moveTo(lastPoint.x, lastPoint.y);
            ctx.lineTo(this.x, this.y);
            ctx.stroke();
            ctx.closePath();
        }
    }

    let particles;
    function init() {
        particles = [];

        for ( let i=0; i< 4; i++) {
            const radius = (Math.random() *2)+1;
            particles.push(new Particle(canvas.width/2, canvas.height/2, radius, colors[Math.floor(Math.random() * colors.length)]));
        }
    }


    function animate() {
        requestAnimationFrame(animate);
        // ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach( particle => {
            particle.update();
        })
    }

    init();
    animate();

    function randomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max-min+1)+min);
    }
}
