// import $ from "jquery";
// var $ = require("jquery");
// $(function(){
    main();
// })



function main() {

    var orien = {
        x: "0",
        y: "0",
        z: "0",
        lx: "0",
        ly: "0",
        lz: "0",
    }
    var rate = {
        x: "0",
        y: "0",
        z: "0",
    }

    var current = {
        x : 0,
        y : 0,
        z : 0
    }
    
    window.addEventListener('deviceorientation', function(event) {
        orien.x = event.beta ;
        orien.y = event.gamma;
        orien.z = event.alpha ;

        box.css("transform", "translate(-50%, -50%) rotateZ("+orien.z+"deg)");
    });
    window.addEventListener("devicemotion", function(event) {
        rate.x = event.rotationRate.beta ;
        rate.y = event.rotationRate.gamma;
        rate.z = event.rotationRate.alpha ;
    });

    // var xEl = document.querySelector("#x span");
    var xEl = $("#x span");
    var yEl = $("#y span");
    var zEl = $("#z span");
    var box = $("#box");

    setInterval(function() {
        xEl.html(Math.round(orien.x));
        yEl.html(Math.round(orien.y));
        zEl.html(Math.round(orien.z));
        // current.z += orien.z;
        // zEl.html(current.z);
        // box.css("transform", "translate(-50%, -50%) rotate("+orien.z+"deg)");
    }, 200)








}