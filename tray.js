var animationlength = 25;
var trays = {
    left: 256,
    moveleft: "off",
    movecenter: "on",
    right: 512,
    moveright: "off",
    fixnav: "off"
};
var action = {};                                 
var segments = [];
var spare;
var animationinitialized = false;

function initializetrays() {
    if (trays.left != 0) {
        trays.left = Math.min(trays.left, window.innerWidth);
        segments[0] = document.querySelector("#left-tray");
        
        segments[0].style.position = "fixed";
        segments[0].style.left = "-" + trays.left + "px";
        segments[0].style.top = "0px";
        segments[0].style.width = trays.left + "px";
        segments[0].style.zIndex = "-2";
        
        if (trays.moveleft == "off") {
            segments[0].style.left = "0px";
            segments[0] = {style: {}};
            segments[0].style.left = "-" + trays.left + "px";
            segments[0].style.width = trays.left + "px";
        }
    }
    if (trays.movecenter == "on") {
        segments[1] = document.querySelector(".center-tray");
        segments[1].style.position = "absolute";
        segments[1].style.left = "0px";
        segments[1].style.top = "0px";
        segments[1].style.width = window.innerWidth + "px";
    }
    if (trays.right != 0) {
        trays.right = Math.min(trays.right, window.innerWidth);
        segments[2] = document.querySelector("#right-tray");
        
        segments[2].style.position = "fixed";
        segments[2].style.left = window.innerWidth + "px";
        segments[2].style.top = "0px";
        segments[2].style.width = trays.right + "px";
        segments[2].style.zIndex = "-2";
        
        if (trays.moveright == "off") {
            segments[2].style.left = window.innerWidth - trays.right + "px";
            segments[2] = {style: {}};
            segments[2].style.left = window.innerWidth + "px";
            segments[2].style.width = trays.right + "px";
        }
    }
    if (trays.fixnav == "on") {
        segments[3] = document.querySelector("header");
        segments[3].style.left = "0px";
    }
    
    spare = segments.length;
}

function animatetray() {
    if (animationinitialized == false){
        if (action.index == 0 && trays.moveleft == "off") {
            document.querySelector("#left-tray").style.left = "0px";
            segments[spare] = document.querySelector("#right-tray");
        }

        if (action.index == 2 && trays.moveright == "off") {
            document.querySelector("#right-tray").style.left = window.innerWidth - trays.right + "px";
            segments[spare] = document.querySelector("#left-tray");
        }
        
        animationinitialized = true;
    }
    
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
        
        animationinitialized = false;
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
        action = {
            index: 2,
            target: window.innerWidth,
            increment: trays.right / animationlength
        }; 
        animatetray();
     }, false);
}