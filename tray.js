var animationlength = 25;
var trays = {
    left: 512,
    moveleft: "off",
    movecenter: "on",
    right: 512,
    moveright: "off",
    fixnav: "on"
};
var action = {};                                 
var segments = [];

function initializetrays() {
    if (trays.left != 0) {
        trays.left = Math.min(trays.left, window.innerWidth);
        if (trays.moveleft == "on") {
            segments[0] = document.querySelector("#left-tray");
        } else {
            segments[0] = {style: {}};
        }
        segments[0].style.left = "-" + trays.left + "px";
        segments[0].style.width = trays.left + "px";
    }
    if (trays.movecenter == "on") {
        segments[1] = document.querySelector(".center-tray");
        segments[1].style.left = "0px";
        segments[1].style.width = window.innerWidth + "px";
    }
    if (trays.right != 0) {
        trays.right = Math.min(trays.right, window.innerWidth);
        if (trays.moveright == "on") {
            segments[2] = document.querySelector("#right-tray");
        } else {
            segments[2] = {style: {}};
        }
        segments[2].style.left = window.innerWidth + "px";
        segments[2].style.width = trays.right + "px";
    }
    if (trays.fixnav == "on") {
        segments[3] = document.querySelector("header");
        segments[3].style.left = "0px";
    }
}

function animatetray() {
    var current = [];
    var next = [];
    
    for (i = 0; i < segments.length; i++) {
        current[i] = parseInt(segments[i].style.left);
    }
    
    var low = action.target - Math.abs(action.increment);
    var high = action.target + Math.abs(action.increment);

    if (current[action.index] < low || high < current[action.index]) {
        for (i = 0; i < segments.length; i++) {
            next[i] = current[i] + Math.ceil(action.increment);
            segments[i].style.left = next[i] + "px";
        }
        setTimeout(animatetray, 10);
    } else {
        var difference = action.target - current[action.index];
        for (i = 0; i < segments.length; i++) {
            current[i] = parseInt(segments[i].style.left);
            next[i] = current[i] + difference;
            segments[i].style.left = next[i] + "px";
        }
    }
}

window.addEventListener("load", initializetrays);
window.addEventListener("resize", initializetrays);

var openleft = document.querySelector("#open-left-tray");
var closeleft = document.querySelector("#close-left-tray");
var openright = document.querySelector("#open-right-tray");
var closeright = document.querySelector("#close-right-tray");

if (openleft != null) {
    openleft.addEventListener("click", function(){
        document.querySelector("#left-tray").style.zIndex = "-1";
        action = {
            index: 0,
            target: 0,
            increment: trays.left / animationlength
        };            
        animatetray();
    }, false);
}

if (closeleft != null) {
    closeleft.addEventListener("click", function(){
        document.querySelector("#left-tray").style.zIndex = "-2";
        action = {
            index: 0,
            target: -trays.left,
            increment: -trays.left / animationlength
        }; 
        animatetray();
    }, false);
}

if (openright != null) {
    openright.addEventListener("click", function(){
        document.querySelector("#right-tray").style.zIndex = "-1";
        action = {
            index: 2,
            target: window.innerWidth - trays.right,
            increment: -trays.right / animationlength
        }; 
        animatetray();
    }, false);
}

if (closeright != null) {
    closeright.addEventListener("click", function(){
        document.querySelector("#right-tray").style.zIndex = "-2";
        action = {
            index: 2,
            target: window.innerWidth,
            increment: trays.right / animationlength
        }; 
        animatetray();
     }, false);
}