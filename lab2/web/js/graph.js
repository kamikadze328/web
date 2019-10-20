
$(document).ready(function() {

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
});
function drawPoint(e) {
    const r = $('input[name=r_value]:checked', '#form').val();
    if(r === undefined) {
        document.querySelector('#error-log').textContent =
            "Выберите значение r!";
    } else {
        const cell = getCursorPosition(e);
        const plot_canvas = document.getElementById("plot");
        const plot_context = plot_canvas.getContext("2d");
        plot_context.beginPath();
        plot_context.rect(x, y, 5, 5);
        x = (x - 150)/100*r;
        y = (-y + 150)/100*r;
        alert(x + " " + y);
        $.ajax({
            type:'post',
            url:'controller',//url адрес файла обработчика
            data:{'x55':x, 'y':y, 'r':r},//параметры запроса
            response:'text',//тип возвращаемого ответа text либо xml
            error: function (message) {
                console.log(message);
                $('#results1').text(message);
                alert("Error " + message);
            },
            success:function (data) {//возвращаемый результат от сервера
                console.log(data);
                //$('#results1').html(data);
                /*$("#if").attr(
                    "src", "data:text/html;charset=utf-8," + data
                );*/
                const ifr = document.getElementById('if').contentDocument;
                ifr.open();
                ifr.writeln(data);
                ifr.close();

                let stra = $('#results1').html(data);
                stra = stra.text();
                //stra = stra.substr(453);
                const numy = stra.search("true");
                if(numy !== -1) {
                    plot_context.fillStyle = 'green';
                } else {
                    plot_context.fillStyle = 'red';
                }
                plot_context.fill();
                //$('#results1').text(numy);
                /*alert("Correct " + message);
                $$('result',$$('result').innerHTML+'<br />'+data);*/
            }
        });

    }
}
function getCursorPosition(e) {
    if (e.pageX !== undefined && e.pageY !== undefined) {
        x = e.pageX;
        y = e.pageY;
    }
    else {
        x = e.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }
    x -= plot_canvas.offsetLeft ;
    y -= plot_canvas.offsetTop ;
}