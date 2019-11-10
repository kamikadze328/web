document.addEventListener('DOMContentLoaded', ()=> {
    document.querySelector("#plot").addEventListener('click', drawPoint);
    //Обновляемое время
    window.setInterval(updateTime, 1000);
    drawGraph();
});

let listOfPoint = [];
class Point {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
}

function drawGraph() {
    const plot_canvas = document.querySelector("#plot");
    const context = plot_canvas.getContext("2d");
    let canvLength = plot_canvas.width;

    drawArea(context, canvLength);

    context.beginPath();
    //Ox
    context.moveTo(0, canvLength/2);
    context.lineTo(canvLength, canvLength/2);
    context.lineTo(canvLength*290/300, canvLength*140/300);
    context.moveTo(canvLength, canvLength/2);
    context.lineTo(canvLength*290/300, canvLength*8/15);
    //Oy
    context.moveTo(canvLength/2, canvLength);
    context.lineTo(canvLength/2, 0);
    context.lineTo(canvLength*140/300, canvLength*10/300);
    context.moveTo(canvLength/2, 0);
    context.lineTo(canvLength*160/300, canvLength*10/300);
    //Dashes
    for (let i=10;i<canvLength*291/300;  i+=28){
        context.moveTo(canvLength/2, canvLength*(i)/300);
        context.lineTo(canvLength*146/300, canvLength*(i)/300);
        context.lineTo(canvLength*154/300, canvLength*(i)/300);
        context.moveTo( canvLength*(i)/300, canvLength/2);
        context.lineTo( canvLength*(i)/300, canvLength*146/300);
        context.lineTo( canvLength*(i)/300, canvLength*154/300);
    }
    context.closePath();
    context.stroke();

    //Names of dashes
    context.fillStyle = '#000000';
    context.font = '14px Arial';
    context.fillText("X", canvLength*290/300, canvLength/2-canvLength*14/300);
    context.fillText("Y", canvLength/2-canvLength*20/300, canvLength*10/300);
    context.fillText("1", canvLength*173/300, canvLength/2-canvLength*10/300);
    context.fillText("1", canvLength/2-canvLength*17/300, canvLength*127/300);

    //Already drawn points
    const selector = document.getElementById('form:r_value');
    const r = selector[selector.selectedIndex].value;
    for(const point of listOfPoint){
        drawDefinedPoint(context, point, r);
    }
}

function reDrawGraph() {
    const plot_canvas = document.getElementById("plot");
    const context = plot_canvas.getContext('2d');
    context.clearRect(0, 0, plot_canvas.width, plot_canvas.height);
    drawGraph();
}

function drawArea(context, canvLength) {
    const selector = document.getElementById('form:r_value');
    const r = selector[selector.selectedIndex].value;
    context.beginPath();
    context.arc(canvLength/2, canvLength/2, canvLength*28*(r/2)/300, 0, Math.PI/2);
    context.lineTo(canvLength/2, canvLength/2);
    context.closePath();
    context.rect(canvLength/2 - canvLength*28*(r/2)/300,canvLength/2 - canvLength*28*r/300,canvLength*28*(r/2)/300, canvLength*28*r/300);
    context.fillStyle = '#ff343b';
    context.fill();
    context.beginPath();
    context.moveTo(canvLength/2, canvLength/2);
    context.lineTo(canvLength/2, canvLength/2 + canvLength*28*r/300);
    context.lineTo(canvLength/2-canvLength*28*r/300, canvLength/2);
    context.lineTo(canvLength/2, canvLength/2);
    context.closePath();
    context.fillStyle = '#ff343b';
    context.fill();
}

function drawPoint(e) {
    const selector = document.getElementById('form:r_value');
    const r = selector[selector.selectedIndex].value;
    const point = getCursorPosition(e);
    const plot_canvas = document.getElementById("plot");
    const context = plot_canvas.getContext("2d");
    listOfPoint.push(new Point(point.x, point.y, r));
    const definedPoint = drawDefinedPoint(context, point, r);
    document.getElementById('canvasForm:canvasX').value = definedPoint.x;
    document.getElementById('canvasForm:canvasY').value = definedPoint.y;
    document.getElementById("canvasForm:canvasSubmit").click();
}

function drawDefinedPoint(context, point, r) {
    context.beginPath();
    context.arc(point.x, point.y, 2, 0, 2 * Math.PI);
    const x = ((point.x - 150) / 28).toFixed(2);
    const y = ((-point.y + 150) / 28).toFixed(2);
    if (checkArea(Number(x), Number(y), Number(r))) {
        context.fillStyle = '#9cd682';
    }else {
        context.fillStyle = '#ff343b';
    }
    context.fill();
    return {x:x, y:y};
}

function updateCanvasR() {
    const selector = document.getElementById('form:r_value');
    document.getElementById('canvasForm:canvasR').value = selector[selector.selectedIndex].value;
}

function checkArea(x, y, r) {
    return (((x >= -r / 2.0 && x <= 0 && y <= r && y >= 0)
        || ((y >= -(x + r)) && y <= 0 && x <= 0)
        || ((x * x + y * y) <= r * r / 4.0 && x >= 0 && y <= 0)));
}



function getCursorPosition(e) {
    let x;
    let y;
    const plot_canvas = document.getElementById("plot");
    if (e.pageX !== undefined && e.pageY !== undefined) {
        x = e.pageX;
        y = e.pageY;
    } else {
        x = e.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }
    return {
        x: x - plot_canvas.getBoundingClientRect().left,
        y: y - plot_canvas.getBoundingClientRect().top
    }
}