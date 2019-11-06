const submit = function (e) {
    e.preventDefault();
    document.querySelector('#error-log').innerHTML ="";
    if (!checkElement("#x-value-select")) {
        checkElement("#y-value-select");
        document.querySelector('#error-log').textContent =
            "Значение X должно быть в диапазоне (-5;5)";
        return;
    } else if (!checkElement("#y-value-select")) {
        document.querySelector('#error-log').textContent =
            "Значение Y должно быть в диапазоне (-3;5)";
        return;
    } else if ($('input[name=r_value]:checked', '#form').val() === undefined) {
        document.querySelector('#error-log').textContent =
            "Выберите значение R!";
        return;
    }
    $.ajax({
        type: "POST",
        url: "controller",
        data:
            {
                x_value: $("#x-value-select").val(),
                y_value: $("#y-value-select").val(),
                r_value: $('input[name=r_value]:checked', '#form').val()
            },
        success: data => document.querySelector('#ans').innerHTML = data,
        error: (jqXHR, textStatus, errorThrown) =>
            document.querySelector('#error-log').innerHTML = "Ошибка HTTP: " + jqXHR.status + "(" + errorThrown + ")",
        dataType: "html"
    });
};

const clear = function(e) {
    if (confirm('Вы уверены??')) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "controller",
            data: {
                type: "clear"
            },
            success: data => {
                document.querySelector('#error-log').innerHTML ="";
                document.querySelector('#ans').innerHTML = data;
                const plot_canvas = document.getElementById("plot");
                const context = plot_canvas.getContext('2d');
                context.clearRect(0, 0, plot_canvas.width, plot_canvas.height);
                drawGraph();
            },
            error: (jqXHR, textStatus, errorThrown) =>
                document.querySelector('#error-log').innerHTML = "Ошибка HTTP: " + jqXHR.status +
                    "(" + errorThrown + ")",
            dataType: "html"
        });
    }
};

document.addEventListener('DOMContentLoaded', ()=> {
    document.querySelector("#plot").addEventListener('click', drawPoint);
    /*
    const radios = document.forms["form"].elements["r_value"];
    let i = 0, max = radios.length;
    for (; i < max; i++) {
        radios[i].addEventListener('click', drawArea);
    }*/
    //Обновляемое время
    window.setInterval(updateTime, 1000);
    drawGraph();
});