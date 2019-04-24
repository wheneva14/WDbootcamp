import "./style.scss";


class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = "black";
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        // ctx.fill();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

main();


function main() {

    var ballsArray = [];
    var numberOfBalls = 1;
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
        for(let i=0; i< numberOfBalls; i++) {
            let radius = 300;
            let x = Math.floor(Math.random() * (window.innerWidth-radius-radius))+radius;
            let y = Math.floor(Math.random() * (window.innerHeight-radius-radius))+radius;
            ballsArray.push( new Ball( x , y , radius) );
        }
        requestAnimationFrame(animate);
    }

    function animate() {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width, 0);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.strokeStyle = "brown";
        ctx.lineWidth = 3;
        ctx.stroke();

        ballsArray.forEach(function(element) {
            element.draw(ctx);
        })

        requestAnimationFrame(animate);
    }









}