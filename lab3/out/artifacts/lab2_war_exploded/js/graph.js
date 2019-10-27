
const drawGraph=function() {
    const plot_canvas = document.getElementById("plot");

    const context = plot_canvas.getContext("2d");
    let canvLength = plot_canvas.width;
    drawArea();

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

    context.fillStyle = '#000000';
    context.font = '14px Arial';
    context.fillText("X", canvLength*290/300, canvLength/2-canvLength*14/300);
    context.fillText("Y", canvLength/2-canvLength*20/300, canvLength*10/300);
};

function drawPoint(e) {
    document.querySelector('#error-log').innerHTML ="";
    const r = $('input[name=r_value]:checked', '#form').val();
    if (r === undefined) {
        document.querySelector('#error-log').textContent =
            "Выберите значение r!";
    } else {
        const point = getCursorPosition(e);
        const plot_canvas = document.getElementById("plot");
        const plot_context = plot_canvas.getContext("2d");
        plot_context.beginPath();
        plot_context.rect(point.x, point.y, 5, 5);
        point.x = (point.x - 150)/100*r;
        point.y = (-point.y + 150)/100*r;
        $.ajax({
            type: "POST",
            url: "controller",
            data:
                {
                    x_value: point.x.toFixed(2),
                    y_value: point.y.toFixed(2),
                    r_value: r
                },
            success: data => {
                document.querySelector('#ans').innerHTML = data;
                //В следующей лабе надо будет точки двух цветов ставить => нужна серверная валидация
                plot_context.fillStyle = 'green';
                plot_context.fill();

            },
            error: (jqXHR, textStatus, errorThrown) =>
                document.querySelector('#error-log').innerHTML = "Ошибка HTTP: " + jqXHR.status + "(" + errorThrown + ")",
            //elem.insertAdjacentHTML("beforeend", "") - будет получше, если по одной строке/точке высылать
            dataType: "html"
        });
    }
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

function drawArea(){
    const plot_canvas = document.getElementById("plot");
    const context = plot_canvas.getContext("2d");
    let canvLength = plot_canvas.width;
    const r = $('input[name=r_value]:checked', '#form').val();
    if (r === undefined) {
        document.querySelector('#error-log').textContent =
            "Выберите значение r!";
    } else {
        context.beginPath();
        context.arc(canvLength/2, canvLength/2, canvLength*28*(r/2)/(300), 0, Math.PI / 2);
        context.lineTo(canvLength / 2, canvLength / 2);
        context.closePath();
        context.rect(canvLength / 3, canvLength / 6, canvLength / 6, canvLength / 3);
        context.fillStyle = '#ff343b';
        context.fill();
        context.beginPath();
        context.moveTo(canvLength / 2, canvLength / 2);
        context.lineTo(canvLength / 2, canvLength * 5 / 6);
        context.lineTo(canvLength / 6, canvLength / 2);
        context.lineTo(canvLength / 2, canvLength / 2);
        context.closePath();
        context.fillStyle = '#ff343b';
        context.fill();
    }
}