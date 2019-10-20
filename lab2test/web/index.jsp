<%@ page import="servlet.Coordinate" %>
<%@ page import="java.util.Vector" %><%--
  Created by IntelliJ IDEA.
  User: Банан
  Date: 15.10.2019
  Time: 22:20
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
          name="viewport">
    <meta content="ie=edge" http-equiv="X-UA-Compatible">

    <link href="img/favicon.ico" rel="shortcut icon" type="image/x-icon">
    <link href="styles/style.css" rel="stylesheet">
    <link href="styles/table.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="js/script.js" type="text/javascript"></script>

    <title>Первая лабка</title>
</head>

<body>
<div class="wrapper">
    <header>
        <span>Вариант 210004</span>
        <span class="student-info">Киселёв Сергей, P3210</span>
    </header>
    <div class="content" id="content">
        <div class="img-form">
            <div class="areas-img centered">
                <img alt="тута график. Его надо смотреть." src="img/areas.png">
            </div>
            <form class="data-send-form" id="form" oninput="onYInpChange()">

                <div class="form-input">
                    <div class="form-input-x"><label for="x-value-select"><strong>X: </strong></label>
                        <input id="x-value-select" maxlength="15" name="x_value" placeholder="-5 ... 5" type="text"
                               value=""/>
                    </div>
                    <div class="form-input-y"><label for="y-value-select"><strong>Y: </strong></label>
                        <input id="y-value-select" maxlength="15" name="y_value" placeholder="-3 ... 5" type="text"
                               value=""/>
                    </div>
                    <div class="radio-buttons centered" id="r_value_select">
                        <p><strong>R: </strong></p>
                        <p><label class="radio-label" for="radio-button-1">1</label>
                            <input class="radio-input" id="radio-button-1" name="r_value" type="radio" value="1">
                        </p>
                        <p><label class="radio-label" for="radio-button-2">2</label>
                            <input class="radio-input" id="radio-button-2" name="r_value" type="radio" value="2">
                        </p>
                        <p><label class="radio-label" for="radio-button-3">3</label>
                            <input checked class="radio-input" id="radio-button-3" name="r_value" type="radio"
                                   value="3">
                        </p>
                        <p><label class="radio-label" for="radio-button-4">4</label>
                            <input class="radio-input" id="radio-button-4" name="r_value" type="radio" value="4">
                        </p>
                        <p><label class="radio-label" for="radio-button-5">5</label>
                            <input class="radio-input" id="radio-button-5" name="r_value" type="radio" value="5">
                        </p>
                    </div>
                    <div class="form-buttons">
                        <button class="check-button" id="submitButton" type="submit">Проверить</button>
                        <button class="clear-button" id="clearButton" type="button">Очистить</button>
                    </div>
                    <div id="error-log" style="color: red"></div>
                </div>
            </form>
        </div>
        <div class="table-wrapper" style="overflow-x: auto;">
            <div class="table">
                <div class="table-header" style="overflow-x: auto">
                    <div class="header__item"><a class="filter__link" id="x-table">X</a></div>
                    <div class="header__item"><a class="filter__link" id="y-table">Y</a></div>
                    <div class="header__item"><a class="filter__link" id="r-table">R</a></div>
                    <div class="header__item"><a class="filter__link" id="result-table">result</a></div>
                    <div class="header__item"><a class="filter__link" id="time-table">Time</a></div>
                    <div class="header__item"><a class="filter__link" id="cr-time-table">Benchmark</a>
                    </div>
                </div>
                <div class="table-content" id="ans">
                    <% Object attribute = request.getSession().getServletContext().getAttribute("userData");
                        if (!(attribute == null || ((Vector<Coordinate>) attribute).size() == 0)) {
                            Vector<Coordinate> coordinates = (Vector<Coordinate>) attribute;
                            for (Coordinate element : coordinates) {%>
                    <div class="table-row">
                        <div class="table-data"><%= element.getX() %></div>
                        <div class="table-data"><%= element.getY() %></div>
                        <div class="table-data"><%= element.getR() %></div>
                        <div class="table-data"><% out.println(element.getCorrectWords()); %></div>
                        <div class="table-data"><%= element.getRequestTime() %></div>
                        <div class="table-data"><%= element.getExecutionTime() %></div>
                    </div>
                    <%}} %>
                </div>
            </div>
        </div>
    </div>
    <footer class="centered">
        <span class="student-info-footer">&copy;kamikadze328, 2019</span>
        <p class="student-footer-icon">
            <a href="https://github.com/kamikadze328" title="GitHub">
                <img alt="ссылка на гит" src="img/GitHubIcon.png">
            </a>
        </p>
    </footer>
</div>
</body>

</html>
