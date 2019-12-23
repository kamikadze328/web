<template>
<div id="app">
    <div class="header">
        <div class="header-inner">
            <div>Лукьяненко, Киселев, Р3210</div>
            <a class="header-logo" href="https://se.ifmo.ru/courses/web">
                <img crossorigin="anonymous" src="./assets/itmo_logo.png" alt="itmo logo">
            </a>
            <div>Вариант 82183</div>
        </div>
    </div>
    <router-view/>
    <div class="alert"></div>
</div>
</template>

<script>
    export default {
        name: "App"
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap&subset=cyrillic');

    :focus {outline: none;}

    * {
        margin: 0;
        padding: 0;
    }

    html {
        font-size: 16px;
    }

    body {
        background-color: #f7f7f7;
        font-family: 'Roboto', Arial, sans-serif;
        overflow-x: hidden;
        color: #2c3e50;
    }

    table {
        border-spacing: 0;
        border-collapse: collapse;
        table-layout: fixed;
    }

    h1 {
        margin-bottom: 6px;
        font-size: 1.6rem;
        font-weight: 500;
    }

    a, router-link {
        color: #2c3e50;
        text-decoration: none;
    }

    h2 {
        margin-bottom: 15px;
        font-weight: 500;
    }

    input {
        font-family: 'Roboto', Arial, sans-serif;
        outline: 0;
    }

    .header {
        background-color: #fafafb;
        font-size: 1rem;
        box-shadow: 0 1px 0 rgba(12,13,14,0.1), 0 1px 6px rgba(59,64,69,0.1);
        color: #212223;
        border-top: 3px solid #00ccbe;
    }

    .header-inner {
        display: flex;
        position: relative;
        flex-direction: row;
        align-items: center;
        max-width: 1264px;
        margin: 0 auto;
        font-size: 15px;
        font-weight: 300;
        padding: 0 15px;
    }

    .header-inner > * {
        width: calc(100% / 3);
    }

    .header-inner > *:first-child {
        text-align: left;
    }

    .header-inner > *:last-child {
        text-align: right;
    }

    .header-logo {
        padding: 5px 0;
    }

    .header-logo img {
        display: block;
        height: 36px;
        margin: 0 auto;
    }

    .wrapper {
        padding-top: 20px;
    }

    .clearfix::after {
        content: "";
        display: table;
        clear: both;
    }

    .green {
        color: #14ce81;
    }

    .red {
        color: #E04E15;
    }
</style>
