/*
* all the code for homework 2 goes into this file.
You will attach event handlers to the document, workspace, and targets defined in the html file
to handle mouse, touch and possible other events.

You will certainly need a large number of global variables to keep track of the current modes and states
of the interaction.
*/
const allTarget = document.querySelectorAll(".target");
const grayPart = document.querySelector("#workspace");
//var selectedDiv;
var mousePosition;
var mouseUpPosition;
var originPosition;
var offset = [0, 0];
var isDown = false;
var isFollowMode = false;
var isFollowModeEnd = false;
var isChangingSize = false;
var movingDiv;
var firstTouchTime;
var secondTouchTime;
var originFingerWidth;
var originDivWidth;
var originLeft;

function removeClassName(cn) {
    for (let i = 0; i < allTarget.length; i++) {
        let div = allTarget[i];
        div.classList.remove(cn);
    }
}

grayPart.addEventListener("click",
    (e) => {
        if (originPosition.x === e.clientX && isFollowModeEnd === false) {
            removeClassName("selected");
        }
        console.log("gray");
    }, true);

for (let i = 0; i < allTarget.length; i++) {
    let div = allTarget[i];
    div.addEventListener(
        "click", function (e) {
            if (originPosition.x === e.clientX && isFollowModeEnd === false) {
                removeClassName("selected");
                console.log("click in rm and select" + i);
                this.classList.add("selected");
            }
            if (isFollowModeEnd === true) {
                isFollowModeEnd = false;
            }
            console.log("click");
        }, true
    );
    div.addEventListener('mousedown', function (e) {
        console.log("div mouse down");
        isDown = true;
        offset = [
            div.offsetLeft - e.clientX,
            div.offsetTop - e.clientY
        ];
        originPosition = {
            x: e.clientX,
            y: e.clientY
        };
        movingDiv = this;
    }, false);
    div.addEventListener('mouseup', () => {
        console.log("div mouse up");
        if (isFollowMode) {
            isFollowModeEnd = true;
            isFollowMode = false;
            console.log("div mouse up set True");
        }
    }, false);
    div.addEventListener('dblclick', function () {
        console.log("double click");
        isDown = true;
        isFollowMode = true;
        movingDiv = this;
    }, false);
    div.addEventListener('touchstart', function (e) {
        console.log("div touch start");
        isDown = true;
        offset = [
            div.offsetLeft - e.touches[0].clientX,
            div.offsetTop - e.touches[0].clientY
        ];
        originPosition = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
        movingDiv = this;
    }, false);
}

grayPart.addEventListener("mousedown",
    (e) => {
        originPosition = {
            x: e.clientX,
            y: e.clientY
        };
        console.log("gray mosue down");
    }, false);


grayPart.addEventListener('mouseup',
    function () {
        console.log("gray mouse up");
        isDown = false;
        movingDiv = undefined;
    }, false);

grayPart.addEventListener('mousemove',
    function (event) {
        event.preventDefault();
        console.log("mouse mmm");
        if (isDown) {
            mousePosition = {

                x: event.clientX,
                y: event.clientY

            };
            movingDiv.style.left = (mousePosition.x + offset[0]) + 'px';
            movingDiv.style.top = (mousePosition.y + offset[1]) + 'px';
        }
    }, false);

document.addEventListener("keyup", (e) => {
    if (e.code === "Escape" && isDown) {
        movingDiv.style.left = (originPosition.x + offset[0]) + 'px';
        movingDiv.style.top = (originPosition.y + offset[1]) + 'px';
        isDown = false;
        movingDiv = undefined;
    }
    console.log("esc");
}, false);

grayPart.addEventListener("touchstart",
    (e) => {
        if (e.touches.length === 1) {
            originPosition = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
            firstTouchTime = e.timeStamp;
            //console.log('1st: ' + firstTouchTime);
        }
        else if (e.touches.length === 2) {
            secondTouchTime = e.timeStamp;
            console.log('1st: ' + firstTouchTime);
            console.log('2nd: ' + secondTouchTime);
            if (secondTouchTime - firstTouchTime <= 100) {
                console.log('two-finger touched');
                let selectedDiv = document.getElementsByClassName('selected')[0];
                originDivWidth = parseInt(selectedDiv.style.width.replace("px", ""));
                originLeft = parseInt(selectedDiv.style.offsetLeft);
                if (selectedDiv !== undefined) {
                    originFingerWidth = Math.abs(e.touches[0].clientX - e.touches[1].clientX);
                    isChangingSize = true;
                    console.log('originFingerWidth: ' + originFingerWidth);
                    console.log('originDivWidth: ' + originDivWidth);
                    console.log('e.touches[0].clientX: ' + e.touches[0].clientX +
                        '\ne.touches[1].clientX: ' + e.touches[1].clientX);
                }
            }
            else {
                console.log('abort');
                if (movingDiv !== undefined) {
                    movingDiv.style.left = (originPosition.x + offset[0]) + 'px';
                    movingDiv.style.top = (originPosition.y + offset[1]) + 'px';
                }
                isDown = false;
                movingDiv = undefined;
            }

        }
        else {
            console.log('abort');
            if (movingDiv !== undefined) {
                movingDiv.style.left = (originPosition.x + offset[0]) + 'px';
                movingDiv.style.top = (originPosition.y + offset[1]) + 'px';
            }
            isDown = false;
            movingDiv = undefined;
        }
        console.log("gray touch start");
    }, false);


grayPart.addEventListener('touchend',
    function (e) {
        console.log("gray touch end, touches count:" + " " + e.touches.length);
        if (e.touches.length === 0) {
            isChangingSize = false;
        }
        if (isFollowMode) {
            console.log("isFollowMode in gray touch end");
        }
        else {
            console.log("Not isFollowMode in gray touch end");
            isDown = false;
            movingDiv = undefined;
        }
    }, false);

grayPart.addEventListener('touchmove',
    function (event) {
        event.preventDefault();
        console.log("touch mmm");
        if (isDown) {
            mousePosition = {

                x: event.touches[0].clientX,
                y: event.touches[0].clientY

            };
            movingDiv.style.left = (mousePosition.x + offset[0]) + 'px';
            movingDiv.style.top = (mousePosition.y + offset[1]) + 'px';
        }
        if (isChangingSize && event.touches.length === 2) {
            let selectedDiv = document.getElementsByClassName('selected')[0];
            //console.log('selec width: ' + originDivWidth);
            console.log('m e.touches[0].clientX: ' + event.touches[0].clientX +
                '\nm e.touches[1].clientX: ' + event.touches[1].clientX);
            let fingerOffset = Math.abs(event.touches[0].clientX - event.touches[1].clientX);
            console.log("fingerOffset: " + fingerOffset);
            console.log('new w: ' + (originDivWidth + fingerOffset - originFingerWidth));
            selectedDiv.style.left = (originLeft - (originDivWidth + fingerOffset - originFingerWidth) / 2) + 'px';
            selectedDiv.style.width = ((originDivWidth + fingerOffset - originFingerWidth)) + 'px';
        }
    }, false);