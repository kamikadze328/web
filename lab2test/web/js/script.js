const checkElement = function (elemAddress) {
    let elem = $(elemAddress);
    if (elem.val().replace(",", ".") !== "-") {
        let value = Number(elem.val().replace(",", "."));
        if (elemAddress[1] === 'x') {
            if (!($.isNumeric(elem.val().replace(",", ".")) || elem.val().replace(",", ".") === "-" || elem
                .val().replace(",", ".") === ""))
                document.getElementById("x-value-select").value = elem.val().slice(0, elem.val().length -
                    1);

            if (value <= -5 || value >= 5 || isNaN(value) || /[\s]+/.test(elem.val()) || elem.val() ===
                "undefined" || elem.val() === "") {
                $(elem).removeClass().addClass("is-invalid");
                return false;
            }
        }
        if (elemAddress[1] === 'y') {
            if (!($.isNumeric(elem.val().replace(",", ".")) || elem.val().replace(",", ".") === "-" || elem
                .val().replace(",", ".") === ""))
                document.getElementById("y-value-select").value = elem.val().slice(0, elem.val().length -
                    1);
            if (value <= -3 || value >= 5 || isNaN(value) || /[\s]+/.test(elem
                .val()) || elem.val() === "") {
                $(elem).removeClass().addClass("is-invalid");
                return false;
            }
        }
        document.querySelector('#error-log').textContent = " ";
        elem.removeClass().addClass("is-valid");
        return true;
    }
};

let onYInpChange = function () {
    if (!checkElement("#x-value-select")) {
        // incorrect
    } else {
        // correct.jpg;
    }
    if (!checkElement("#y-value-select")) {
        // incorrect.jpg
    } else {
        // correct.jpg
    }
};

const submit = function (e) {
    e.preventDefault();
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
        url: "test",
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

const clear = function (e) {
    if (confirm('Вы уверены??')) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "test",
            data: {
                type: "clear"
            },
            success: data => document.querySelector('#ans').innerHTML = data,
            error: (jqXHR, textStatus, errorThrown) =>
                document.querySelector('#error-log').innerHTML = "Ошибка HTTP: " + jqXHR.status +
                    "(" + errorThrown + ")",
            dataType: "html"
        });
    }
};

document.addEventListener('DOMContentLoaded', ()=> {
    document.querySelector('#submitButton').addEventListener('click', submit);
    document.querySelector('#clearButton').addEventListener('click', clear);
});
