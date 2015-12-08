var canvas, ctx, flag = false,
    previousX = 0,
    currentX = 0,
    previousY = 0,
    currentY = 0,
    dot_flag = false;

var x = "black",
    y = 2;

    doesBubble = false;

function onLoad() {
    canvas = document.getElementById('drawingSurface');
    page = document.getElementById('content');
    button = document.getElementById('toggleBubbling');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener("mouseout", function (e) {
        findxy('mouseOffScreen', e);
    }, false);
    canvas.addEventListener("mousemove", function (e) {
        findxy('mouseMoved', e);
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('mousePressed', e);
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('mouseReleased', e);
    }, false);

    page.addEventListener("mousedown", function(e){
        changeColor(e);
    }, false);


    button.addEventListener("mousedown", toggleBubbling, false);


}

function changeColor(e){
    console.log("CHANGE");
    switch(x){
        case 'black':
            x = 'blue';
            break;
        case 'blue':
            x = 'red';
            break;
        case 'red':
            x = 'purple';
            break;
        case 'purple':
            x = 'black';
            break;
    }

        document.getElementById("header").innerHTML = "Drawing Color is " + x;
}

function draw() {
    ctx.beginPath();
    ctx.moveTo(previousX, previousY);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

function findxy(res, e) {
    if(!doesBubble){
        e.stopPropagation();
    }
    if (res == 'mousePressed') {
        previousX = currentX;
        previousY = currentY;
        currentX = e.clientX - canvas.offsetLeft;
        currentY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currentX, currentY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'mouseReleased' || res == "mouseOffScreen") {
        flag = false;
    }
    if (res == 'mouseMoved') {
        if (flag) {
            previousX = currentX;
            previousY = currentY;
            currentX = e.clientX - canvas.offsetLeft;
            currentY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}


function toggleBubbling(e){
    if(!doesBubble){
        e.stopPropagation();
    }
    doesBubble = !doesBubble;
    document.getElementById("toggleBubbling").innerHTML = (doesBubble ? "Turn Bubbling Off": "Turn Bubbling On");
}
