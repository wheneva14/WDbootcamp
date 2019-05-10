import "./style.scss";


class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.oriRadius = radius;
        this.color = color;
        this.dx = (Math.random()*0.08)-0.04;
        this.dy = (Math.random()*0.08)-0.04;
    }

    update(delta, mousex, mousey) {
        if(mousex && mousey && (distance(this.x, this.y, mousex, mousey)-this.radius) <= 20 && this.radius <= 30) {
            this.radius += 1;
        } else if ( (!mousex || (distance(this.x, this.y, mousex, mousey)-this.radius) > 20) && this.radius > this.oriRadius) {
            this.radius -= 1;
        }
        if(this.x - this.radius < 0 || this.x + this.radius > window.innerWidth) {
            this.dx *= -1;
        }
        if(this.y - this.radius < 0 || this.y + this.radius > window.innerHeight) {
            this.dy *= -1;
        }
        this.x += this.dx*delta;
        this.y += this.dy*delta;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        // ctx.strokeStyle = this.color;
        // ctx.lineWidth = 1;
        // ctx.stroke();
    }
}



function distance(x1, y1, x2, y2) {
    let xTotal = x1-x2;
    let yTotal = y1-y2;

    return (xTotal**2 + yTotal**2)**(1/2)
}

main();


function main() {

    var ballsArray = [];
    var numberOfBalls = 1000;
    var ballColor = [
        "#E89BB9",
        "#FFB7F6",
        "#D89BE8",
        "#D6ABFF",
        "#FFAEAB"
    ]
    var lastRanTime;
    const TIMESTEP = 1000/60;
    var delta = 0;

    var mouse = {
        x : null,
        y : null
    }

    var raf = null;
    var pixelRatio = window.devicePixelRatio || 1;
    var canvas = document.createElement('canvas');
    canvas.setAttribute("id", "canvas");
    canvas.height=window.innerHeight * pixelRatio;
    canvas.width=window.innerWidth * pixelRatio;
    document.body.append(canvas);
    var ctx = canvas.getContext("2d");
    ctx.scale(pixelRatio, pixelRatio);

    init();
    
    function init() {
        cancelAnimationFrame(raf);
        if(!ballsArray.length) {
            for(let i=0; i< numberOfBalls; i++) {
                let radius = (Math.random() * 5)+5;
                // let x = Math.floor(Math.random() * (window.innerWidth-radius-radius))+radius;
                // let y = Math.floor(Math.random() * (window.innerHeight-radius-radius))+radius;

                /***  FOR CIRCLE SHAPE
                let r = Math.random() * 200;
                let degree = Math.random() * 360;
                let x = r * Math.cos(degree);
                let y = r * Math.sin(degree);

                x += window.innerWidth / 2;
                y += window.innerHeight / 2;
                *****/



                let x = (Math.random() * (window.innerWidth/2)) + (window.innerWidth/4) ;
                let y = (Math.random() * (window.innerHeight/2)) + (window.innerHeight/4) ;
                let color = ballColor[Math.floor(Math.random() * ballColor.length)];
                ballsArray.push( new Ball( x , y , radius, color) );
            }
        } 
        raf = requestAnimationFrame(animate);
    }

    function animate(timestamp) {
        if(lastRanTime == null) {
            lastRanTime = timestamp
        }
        delta = delta + (timestamp - lastRanTime);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);


        // ctx.beginPath();
        // ctx.moveTo(0, 0);
        // ctx.lineTo(window.innerWidth, 0);
        // ctx.lineTo(window.innerWidth, window.innerHeight);
        // ctx.lineTo(0, window.innerHeight);
        // ctx.closePath();
        // ctx.strokeStyle = "brown";
        // ctx.lineWidth = 2;
        // ctx.stroke();

        // ctx.moveTo(mouse.x, 0);
        // ctx.lineTo(mouse.x, window.innerHeight);
        // ctx.moveTo(0, mouse.y);
        // ctx.lineTo(window.innerWidth, mouse.y);
        // ctx.strokeStyle = "red";
        // ctx.lineWidth = 1;
        // ctx.stroke();

        while(delta >= TIMESTEP) {
            ballsArray.forEach(function(element) {
                element.update(TIMESTEP, mouse.x, mouse.y);
            })
            delta -= TIMESTEP;
        }

        ballsArray.forEach(function(element) {
            element.draw(ctx);
        })

        // ctx.font = `${20}px times`;
        // ctx.fillStyle = "#333";
        // ctx.fillText(canvas.width, 20, 20);
        // ctx.fillText(canvas.height, 20, 40);
        // ctx.fillText(window.innerWidth, 20, 60);
        // ctx.fillText(window.innerHeight, 20, 80);
        // ctx.fillText(pixelRatio, 20, 100);
        // ctx.fillText(mouse.x, 20, 120);
        // ctx.fillText(mouse.y, 20, 140);



        lastRanTime = timestamp;
        raf = requestAnimationFrame(animate);
    }




    window.addEventListener("resize", function() {
        canvas.height=window.innerHeight * pixelRatio;
        canvas.width=window.innerWidth * pixelRatio;
        ctx.scale(pixelRatio, pixelRatio);
        init();
    })

    window.addEventListener("mousemove", function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    })
    window.addEventListener("mouseout", function(event){
        mouse.x = null;
        mouse.y = null;
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


}