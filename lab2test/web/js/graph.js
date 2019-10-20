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