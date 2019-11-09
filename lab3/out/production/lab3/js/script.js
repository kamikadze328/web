document.addEventListener('DOMContentLoaded', ()=> {
    document.querySelector("#plot").addEventListener('click', drawPoint);
    /*for (const td of document.getElementsByTagName("td")) {
        if (td.innerText.replace(" ", "").toUpperCase() === "TRUE") {
            td.classList.add("is-true");
        } else if (td.innerText.replace(" ", "").toUpperCase() === "FALSE") {
            td.classList.add("is-false")
        }
    }*/
    //Обновляемое время
    window.setInterval(updateTime, 1000);
    drawGraph();
});
