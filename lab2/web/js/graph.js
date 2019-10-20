
const drawGraph=function() {
    const plot_canvas = document.getElementById("plot");

    const plot_context = plot_canvas.getContext("2d");

    plot_context.beginPath();
    plot_context.arc(150, 150, 50, 0, Math.PI / 2);
    plot_context.lineTo(150, 150);
    plot_context.closePath();
    plot_context.rect(100, 50, 50, 100);
    plot_context.fillStyle = '#ff343b';
    plot_context.fill();
    plot_context.beginPath();
    plot_context.moveTo(150, 150);
    plot_context.lineTo(150, 250);
    plot_context.lineTo(50, 150);
    plot_context.lineTo(150, 150);
    plot_context.closePath();
    plot_context.fillStyle = '#ff343b';
    plot_context.fill();
    plot_context.beginPath();
//Ox
    plot_context.moveTo(30, 150);
    plot_context.lineTo(270, 150);
    plot_context.lineTo(260, 140);
    plot_context.moveTo(270, 150);
    plot_context.lineTo(260, 160);
//Oy
    plot_context.moveTo(150, 30);
    plot_context.lineTo(140, 40);
    plot_context.moveTo(150, 30);
    plot_context.lineTo(160, 40);
    plot_context.moveTo(150, 30);
    plot_context.lineTo(150, 270);

    plot_context.moveTo(30, 150);
    plot_context.closePath();
    plot_context.stroke();

};
//$(document).ready(drawGraph());

function drawPoint(e) {
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