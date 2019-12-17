<template>
    <div class="wrapper">
        <div class="content">
            <div class="links">
                <h2>Укажите параметры X, Y и R</h2>
                <a href="/" v-on:click.prevent="logoutRequest">Выйти</a>
            </div>
            <div class="content-wrapper">
                <div v-on:click="addPointFromCanvas" class="graph">
                    <canvas id="plot" width="300" height="300"></canvas>
                </div>

                <div class="selection">
                    <form v-on:submit.prevent="addPoint">
                        <div class="form-select x-select">
                            <label class="selection-label">Выберите X
                                <span class="warning" data-validate="Выберите X"></span>
                            </label>
                            <div class="select-buttons">
                                <button v-for="num in buttons" v-bind:key="num" class="changeX" type="button">{{num}}</button>
                            </div>
                        </div>
                        <div class="form-select y-select">
                            <label class="selection-label" for="Y-select">Выберите Y
                                <span class="warning" data-validate="Y - значение в диапазоне [-3; 3]"></span>
                            </label>
                            <input id="Y-select" type="text" placeholder="-3...3" name="y" autocomplete="off">
                        </div>
                        <div class="form-select r-select">
                            <label class="selection-label">Выберите R
                                <span class="warning" data-validate="Выберите R"></span>
                            </label>
                            <div class="select-buttons">
                                <button v-for="num in buttons" v-bind:class="{'btn-hold': (num === 1)}" v-bind:key="num" class="changeR" type="button">{{num}}</button>
                            </div>
                        </div>
                        <div class="form-buttons">
                            <input class="form-btn btn-submit" type="submit" value="Отправить">
                        </div>
                    </form>
                </div>

                <table class="results">
                    <tbody v-if="listOfPoints.length">
                        <tr>
                            <th>X</th>
                            <th>Y</th>
                            <th>R</th>
                            <th>Попадание</th>
                        </tr>
                        <tr v-for="cPoint in listOfPoints">
                            <td>{{cPoint.x}}</td>
                            <td>{{cPoint.y}}</td>
                            <td>{{cPoint.r}}</td>
                            <td v-if="cPoint.result" class="green">Входит</td>
                            <td v-else class="red">Не входит</td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Попадание</th>
                    </tr>
                        <tr>
                            <td colspan="4">Нет данных</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';

    export default {
        name: "Main",
        data() {
            return {
                response: null,
                listOfPoints: [],
                buttons: [-4, -3, -2, -1, 0, 1, 2, 3, 4]
            }
        },
        methods: {
            logoutRequest: function () {
                let base64Credential = localStorage.getItem('currentUser');
                this.$axios({
                    method: 'post',
                    url: this.$BaseURL + 'login',
                    headers: {'Content_type': 'application/json', 'Authorization': base64Credential}
                }).then(response => {
                    this.response = response;
                    localStorage.removeItem('currentUser');
                    this.$router.push('/');
                    return true;
                }).catch(error => {
                    console.log(error.response.data);
                    return false;
                });
            },
            getPointsRequest: function () {
                let base64Credential = localStorage.getItem('currentUser');
                console.log(base64Credential);
                this.$axios({
                    method: 'get',
                    url: this.$BaseURL + 'points',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': base64Credential
                    }
                }).then(response => {
                    console.log(response.data);
                    if(response.data.length){
                        this.listOfPoints = response.data;
                    }
                    return true;
                }).catch(error => {
                    console.log(error.response.data);
                    return false;
                });
            },
            addPointRequest: function (x, y, r) {
                let base64Credential = localStorage.getItem('currentUser');
                this.$axios({
                    method: 'post',
                    url: this.$BaseURL + 'points',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': base64Credential
                    },
                    data: {x: x, y: y, r: r}
                }).then(response => this.response = response);
            },
            addPointFromCanvas: function (e) {
                let r = document.querySelector('.r-select .btn-hold').innerText;
                const point = this.getCursorPosition(e);
                const plot_canvas = document.getElementById("plot");
                const context = plot_canvas.getContext("2d");
                const definedPoint = this.drawDefinedPoint(context, point.x, point.y, r);
                const x = definedPoint.x;
                const y = definedPoint.y;
                this.addPointRequest(x, y, r);
                if(this.checkArea(Number(x), Number(y), Number(r))) {
                    this.listOfPoints.push({x: x, y: y, r: r, result:true });
                }
                else{
                    this.listOfPoints.push({x: x, y: y, r: r, result:false });
                }

            },
            addPoint: function () {
                let xSelect = document.querySelector('.x-select .btn-hold');
                let x = xSelect ? xSelect.innerText : null;
                let y = document.getElementById('Y-select').value.trim();
                let rSelect = document.querySelector('.r-select .btn-hold');
                let r = rSelect ? rSelect.innerText : null;

                let validX = !!x;
                let validY = false;
                let validR = !!r;
                if (!validX) {$('.x-select .warning').addClass('icon-visible')}
                if (!validR) {$('.r-select .warning').addClass('icon-visible')}

                if (y.match(/^-?[0-9]*[.,]?[0-9]+$/) && y && y !== '-') {
                    y = y.replace(',', '.');
                    if (y >= -3 && y <= 3) {
                        validY = true;
                    }
                }
                if (!validY) {
                    $('.y-select .warning').addClass('icon-visible');
                }

                if (validX && validY && validR) {
                    console.log('all is correct (X Y R)');
                    this.listOfPoints.push({x: x, y: y, r: r, result: false});
                    this.addPointRequest(x, y, r);

                    //draw this point
                    const plot_canvas = document.querySelector("#plot");
                    const context = plot_canvas.getContext("2d");
                    context.beginPath();

                    if (this.checkArea(Number(x), Number(y), Number(r))) {
                        this.listOfPoints[this.listOfPoints.length - 1].result = true;

                        x = Number(x * 28 + 150);
                        y = Number(150 - 28 * y);
                        context.arc(x, y, 2, 0, 2 * Math.PI);
                        context.fillStyle = '#ff343b';
                    } else {
                        this.listOfPoints[this.listOfPoints.length - 1].result = false;

                        x = Number(x * 28 + 150);
                        y = Number(150 - 28 * y);
                        context.arc(x, y, 2, 0, 2 * Math.PI);
                        context.fillStyle = '#6edddd';
                    }
                    context.fill();
                }
            },
            drawDefinedPoint: function (context, xFromList, yFromList, r) {
                let point = {x:Number(xFromList), y:Number(yFromList)};
                context.beginPath();
                context.arc(point.x, point.y, 2, 0, 2 * Math.PI);
                const x = ((point.x - 150) / 28).toFixed(2);
                const y = ((-point.y + 150) / 28).toFixed(2);
                if (this.checkArea(Number(x), Number(y), Number(r))) {
                    context.fillStyle = '#ff343b';
                } else {
                    context.fillStyle = '#6edddd';
                }
                context.fill();
                return {x: x, y: y};
            },
            getCursorPosition: function (e) {
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
            },
            checkArea: function (x, y, r) {
                return (((x >= -r / 2.0 && x <= 0 && y <= r && y >= 0)
                    || ((y >= -(x + r)) && y <= 0 && x <= 0)
                    || ((x * x + y * y) <= r * r / 4.0 && x >= 0 && y <= 0)));
            },
            drawGraph: function () {
                const plot_canvas = document.querySelector("#plot");
                const context = plot_canvas.getContext("2d");
                let canvLength = plot_canvas.width;

                this.drawArea(context, canvLength);

                context.beginPath();
                //Ox
                context.moveTo(10, canvLength / 2);
                context.lineTo(canvLength - 10, canvLength / 2);
                context.lineTo(canvLength - 20, canvLength / 2 - 7);
                context.moveTo(canvLength - 10, canvLength / 2);
                context.lineTo(canvLength - 20, canvLength / 2 + 7);
                //Oy
                context.moveTo(canvLength / 2, canvLength - 10);
                context.lineTo(canvLength / 2, 10);
                context.lineTo(canvLength / 2 - 7, 20);
                context.moveTo(canvLength / 2, 10);
                context.lineTo(canvLength / 2 + 7, 20);
                //Dashes
                for (let i = 10 + 28; i < canvLength * 291 / 300 - 28; i += 28) {
                    context.moveTo(canvLength / 2, canvLength * (i) / 300);
                    context.lineTo(canvLength * 146 / 300, canvLength * (i) / 300);
                    context.lineTo(canvLength * 154 / 300, canvLength * (i) / 300);
                    context.moveTo(canvLength * (i) / 300, canvLength / 2);
                    context.lineTo(canvLength * (i) / 300, canvLength * 146 / 300);
                    context.lineTo(canvLength * (i) / 300, canvLength * 154 / 300);
                }
                context.closePath();
                context.stroke();

                //Names of dashes
                context.fillStyle = '#000000';
                context.font = '14px Arial';
                context.fillText("X", canvLength - 20, canvLength / 2 - 13);
                context.fillText("Y", canvLength / 2 - 20, 20);
                context.fillText("1", canvLength * 173 / 300, canvLength / 2 - canvLength * 10 / 300);
                context.fillText("1", canvLength / 2 - canvLength * 17 / 300, canvLength * 127 / 300);

                //Already drawn points
                let r = document.querySelector('.r-select .btn-hold').innerText;
                for (let point of this.listOfPoints) {
                    const x = Number(Number(point.x) * 28 + 150);
                    const y = Number(150 - 28 * Number(point.y));
                    this.drawDefinedPoint(context, x, y, r);
                }
            },
            drawArea: function (context, canvLength) {
                let r = document.querySelector('.r-select .btn-hold').innerText;
                context.beginPath();
                context.arc(canvLength / 2, canvLength / 2, canvLength * 28 * (r / 2) / 300, 0, Math.PI / 2);
                context.lineTo(canvLength / 2, canvLength / 2);
                context.closePath();
                context.rect(canvLength / 2 - canvLength * 28 * (r / 2) / 300, canvLength / 2 - canvLength * 28 * r / 300, canvLength * 28 * (r / 2) / 300, canvLength * 28 * r / 300);
                context.fillStyle = '#6edddd';
                context.fill();
                context.beginPath();
                context.moveTo(canvLength / 2, canvLength / 2);
                context.lineTo(canvLength / 2, canvLength / 2 + canvLength * 28 * r / 300);
                context.lineTo(canvLength / 2 - canvLength * 28 * r / 300, canvLength / 2);
                context.lineTo(canvLength / 2, canvLength / 2);
                context.closePath();
                context.fillStyle = '#6edddd';
                context.fill();
            },
            reDrawGraph: function () {
                const plot_canvas = document.getElementById("plot");
                const context = plot_canvas.getContext('2d');
                context.clearRect(0, 0, plot_canvas.width, plot_canvas.height);
                this.drawGraph();
            }

        },
        mounted() {
            const vm = this;
            $('.changeR').on('click', function () {
                $(this).siblings().removeClass('btn-hold');
                $(this).addClass('btn-hold');
                $(this).parent().parent().find('.warning').removeClass('icon-visible');
                vm.reDrawGraph();
            });
            $('.changeX').on('click', function () {
                $(this).siblings().removeClass('btn-hold');
                $(this).addClass('btn-hold');
                $(this).parent().parent().find('.warning').removeClass('icon-visible');
            });
            this.drawGraph();
            // При переходе на страницу получаем от сервера массив точек и добавляем его в data
            let response = this.getPointsRequest();
            if(response){
                this.listOfPoints = response;
            }
        },
    }

    $(document).ready(function () {
        $('#Y-select').on('focus', function () {
            $('.y-select .warning').removeClass('icon-visible');
        });
    });
</script>

<style scoped>
    .content {
        max-width: 1264px;
        margin: 0 auto;
        padding: 0 15px;
    }

    .content-wrapper {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
    }

    .content-wrapper > * {
        margin-bottom: 15px;
        box-shadow: 0 2px 10px rgba(59, 64, 69, 0.1);
    }

    .links {
        display: flex;
        justify-content: space-between;
    }

    .alert {
        display: none;
        padding: 10px 18px;
        position: fixed;
        right: 10px;
        bottom: 0;
        background-color: #d13000;
        color: #fff;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        font-size: 0.9rem;
    }

    /* ====== Graph ====== */

    .graph {
        height: 300px;
        width: 300px;
        margin-right: 20px;
        background-color: #fff;
        border-radius: 6px;
    }

    #plot {
        cursor: pointer;
    }

    /* ====== Form ====== */

    .selection {
        background-color: #fff;
        margin-right: 20px;
        border-radius: 5px;
        padding: 10px;
    }

    .form-select {
        margin-bottom: 10px;
    }

    .selection-label {
        display: block;
        margin-bottom: 4px;
        position: relative;
    }

    .selection-label:hover .icon-visible::after {
        visibility: visible;
        opacity: 1;
    }

    .select-buttons {
        display: flex;
        justify-content: space-between;
    }

    .select-buttons > button {
        display: inline-block;
        width: 1.5rem;
        margin-right: 3px;
        padding: 3px 0;
        background-color: #fff;
        border: 1px solid #c8c8c8;
        border-radius: 4px;
        text-align: center;
        outline: none;
        cursor: pointer;
    }

    .select-buttons > button:last-child {
        margin-right: 0;
    }

    .select-buttons > button:hover {
        background-color: #eee;
    }

    .btn-hold {
        background-color: #4F93E8 !important;
        color: #fff;
    }

    #Y-select {
        display: block;
        width: 2rem;
        padding: 3px 5px 2px 5px;
        border: solid 1px #c8c8c8;
        border-radius: 4px;
        outline: 0;
    }

    #Y-select:focus {
        border-color: #2086d2;
    }

    .form-btn {
        width: 100%;
        padding: 10px 22px;
        border: 0;
        border-radius: 4px;
        color: #fff;
        font-size: 0.9rem;
        cursor: pointer;
        outline: 0;
    }

    .btn-submit {
        background-color: #14ce81;
        margin-right: 5px;
    }

    .submit-form:hover {
        background-color: hsla(155, 82%, 40%, 1);
    }

    .clear-cookie {
        display: none;
        background-color: hsla(17, 83%, 48%, 1);
    }

    .clear-cookie:hover {
        background-color: hsl(17, 83%, 44%);
    }

    .icon-visible {
        visibility: visible !important;
        opacity: 1;
    }

    .warning {
        content: attr(data-validate);
        display: inline-block;
        visibility: hidden;
        position: relative;
        background-size: 15px;
        width: 15px;
        height: 15px;
        background-image: url("../assets/warning.svg");
        vertical-align: top;
        margin: 2px 0 0 6px;
        transition: opacity 0.5s ease;
        transform-style: preserve-3d;
    }

    .warning::after {
        content: attr(data-validate);
        position: absolute;
        visibility: hidden;
        opacity: 0;
        width: max-content;
        left: -5px;
        top: 50%;
        padding: 4px 4px 3px 23px;
        font-size: 0.8rem;
        font-weight: 500;
        background-color: #fff;
        color: #c80000;
        border: 1px solid #c80000;
        border-radius: 3px;
        transform: translateY(-50%) translateZ(-1px);
        transition: opacity .2s;
    }

    /* ====== Table ====== */

    .results {
        flex-grow: 1;
    }

    .results tr:nth-child(odd) {
        background-color: #f5f5f5;
    }

    .results th {
        background-color: #6edddd;
        font-weight: 500;
    }

    .results td, .results th{
        border: solid 1px #747474;
        /* width: 14%; */
        padding: 5px 4px;
        text-align: center;
    }
</style>