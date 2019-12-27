<template>
    <div class="form-wrapper">
        <form v-on:submit.prevent="checkForm">
            <input v-model="action" checked="" id="signin" name="action" type="radio" value="login">
            <label for="signin">Вход</label>
            <input v-model="action" id="signup" name="action" type="radio" value="register">
            <label for="signup">Регистрация</label>
            <div id="wrapper">
                <div id="arrow"></div>
                <div :class="{'invalid':!nameValid}" class="warning">
                    <input v-model="name" @change="validateInput" minlength="3" maxlength="25" id="name" placeholder="Имя" type="text">
                    <span :data-validate="errors.name"></span>
                </div>
                <div :class="{'invalid':!passwordValid}" class="warning">
                    <input v-model="password" @change="validateInput" minlength="3" maxlength="25" id="password" placeholder="Пароль" type="password">
                    <span :data-validate="errors.password"></span>
                </div>
                <div :class="{'invalid':!confirmValid}" class="warning">
                    <input v-model="passwordConfirm" @change="validateInput" minlength="3" maxlength="25" id="confirm" placeholder="Повторите пароль" type="password">
                    <span :data-validate="errors.passwordConfirm"></span>
                </div>
            </div>
            <button type="submit">
                <span>
                Забыл пароль
                <br>
                Войти
                <br>
                Создать аккаунт
                </span>
            </button>
            <div class="login-error" v-if="errorRequest">
                <p class="red">{{errorRequest}}</p>
            </div>
            <div class="login-error" v-if="success">
                <p class="green">{{success}}</p>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                response: null,
                action: 'login',
                errors: {
                    name: '',
                    password: '',
                    passwordConfirm: ''
                },
                success: '',
                errorRequest: '',
                name: null,
                password: null,
                passwordConfirm: null,
                nameValid: true,
                passwordValid: true,
                confirmValid: true
            }
        },
        watch: {
            action: function () {
                this.nameValid = true;
                this.passwordValid = true;
                this.confirmValid = true;
            }
        },
        methods: {
            registerRequest: function () {
                this.$axios({
                    method: 'post',
                    url: this.$BaseURL + this.action,
                    headers: {'Content_type': 'application/json'},
                    data: {
                        username: this.name,
                        password: this.password
                    }
                }).then(() => {
                    this.success = 'Аккаунт успешно создан!';
                    this.errorRequest = '';
                    return true;
                }).catch(error => {
                    error.response.status === 409 ? this.errorRequest = 'Имя пользователя занято' : this.errorRequest = 'Ошибка регистрации';
                });
            },
            loginRequest: function () {
                let base64Credential = 'Basic ' + btoa(this.name + ':' + this.password);
                this.$axios({
                    method: 'post',
                    url: this.$BaseURL + this.action,
                    headers: {'Content_type': 'application/json', 'Authorization':  base64Credential}
                }).then(response => {
                    if (response.status === 302) {
                        this.errorRequest = 'Неверный логин или пароль';
                    } else {
                        this.response = response;
                        localStorage.setItem('currentUser', base64Credential);
                        this.$router.push('/main');
                    }
                }).catch(() => {
                    this.errorRequest = 'Неверный логин или пароль';
                });
            },
            checkForm: function () {
                if (this.nameValid && this.passwordValid && this.confirmValid) {
                    if (this.action === 'register') {
                        if (this.registerRequest()) {
                            this.loginRequest();
                        }
                    }
                    else if (this.action === 'login') {
                        this.loginRequest();
                    }
                }
            },
            validateInput: function (event) {
                switch (event.target.id) {
                    case 'name':
                        if (!this.name) {
                            this.nameValid = false;
                            this.errors.name = 'Укажите имя';
                        } else if (!this.name.match(/^[A-Za-z0-9]*$/)) {
                            this.nameValid = false;
                            this.errors.name = 'Только латинские буквы и цифры';
                        } else {
                            this.nameValid = true;
                        }
                        break;
                    case 'password':
                        if (!this.password) {
                            this.passwordValid = false;
                            this.errors.password = 'Укажите пароль';
                        } else if (!this.password.match(/^[A-Za-z0-9]*$/)) {
                            this.passwordValid = false;
                            this.errors.password = 'Только латинские буквы и цифры';
                        } else {
                            this.passwordValid = true;
                            if (this.passwordConfirm) {
                                if (this.password !== this.passwordConfirm) {
                                    this.confirmValid = false;
                                    this.errors.passwordConfirm = 'Пароли не совпадают';
                                } else {
                                    this.confirmValid = true;
                                }
                            }
                        }
                        break;
                    case 'confirm':
                        if (!this.passwordConfirm) {
                            this.confirmValid = false;
                            this.errors.passwordConfirm = 'Укажите пароль еще раз';
                        }
                        else if (this.password !== this.passwordConfirm) {
                            this.confirmValid = false;
                            this.errors.passwordConfirm = 'Пароли не совпадают';
                        }
                        else {
                            this.confirmValid = true;
                        }
                        break;
                }
            }
        }
    }
</script>

<style scoped>
    #wrapper, label, #arrow, button span {
        transition: height, transform .5s, .5s ease, -webkit-transform .5s;
    }

    #wrapper {
        overflow: hidden;
    }

    #signin:checked ~ #wrapper {
        height: 126px;
    }

    #signin:checked ~ #wrapper #arrow {
        left: 10px;
    }

    #signin:checked ~ button span {
        transform: translate3d(0, -48px, 0);
    }

    #signup:checked ~ #wrapper {
        height: 184px;
    }

    #signup:checked ~ #wrapper #arrow {
        left: 108px;
    }

    #signup:checked ~ button span {
        transform: translate3d(0, -96px, 0);
    }

    #reset:checked ~ #wrapper {
        height: 94px;
    }

    #reset:checked ~ #wrapper #arrow {
        left: 404px;
    }

    #reset:checked ~ button span {
        transform: translate3d(0, 0, 0);
    }

    form {
        max-width: 450px;
        width: 100%;
        min-width: 180px;
        margin: 0 15px;
    }

    input[type=radio] {
        display: none;
    }

    label {
        cursor: pointer;
        display: inline-block;
        font-size: 16px;
        font-weight: 800;
        opacity: .5;
        margin-bottom: 15px;
        text-transform: uppercase;
    }

    label:hover {
        transition: all .3s cubic-bezier(.6, 0, .4, 1);
        opacity: 1;
    }

    label[for="signin"] {
        margin-right: 20px;
    }

    input[type=radio]:checked + label {
        opacity: 1;
    }

    input[type=text],
    input[type=password] {
        background: #fff;
        border: 1px solid #fff;
        border-radius: 8px;
        font-size: 16px;
        height: 46px;
        width: 99.6%;
        opacity: 1;
        text-indent: 20px;
        transition: all .2s ease-in-out;
    }

    button {
        background-color: hsla(176, 100%, 40%, 1);
        border: none;
        border-radius: 8px;
        color: #fff;
        cursor: pointer;
        font-size: 18px;
        height: 48px;
        width: 100%;
        margin-bottom: 10px;
        overflow: hidden;
        transition: all .3s cubic-bezier(.6, 0, .4, 1);
    }

    button span {
        display: block;
        line-height: 48px;
        position: relative;
        top: 0;
        transform: translate3d(0, 0, 0);
    }

    button:hover {
        background: hsl(176, 100%, 35%);
    }

    #arrow {
        height: 0;
        width: 0;
        border-bottom: 10px solid #fff;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        position: relative;
        left: 32px;
    }

    .warning {
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .warning > span {
        visibility: hidden;
        position: absolute;
        right: 16px;
        width: 1rem;
        height: 1rem;
        background: url("../assets/warning.svg") no-repeat;
        background-size: 1rem;
        transition: opacity 0.5s ease;
        transform-style: preserve-3d;
    }

    .warning > span::after {
        content: attr(data-validate);
        position: absolute;
        visibility: hidden;
        opacity: 0;
        right: -5px;
        top: 50%;
        padding: 0 28px 0 4px;
        font-size: 0.9rem;
        font-weight: 500;
        color: #c80000;
        white-space: nowrap;
        transform: translateY(-50%) translateZ(-1px);
        transition: opacity .2s;
    }

    .invalid span {
        visibility: visible !important;
        opacity: 1;
    }

    .invalid input {
        border-color: #c80000;
    }

    .invalid:hover span::after {
        visibility: visible;
        opacity: 1;
    }
</style>