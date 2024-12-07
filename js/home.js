const Swal = require('sweetalert2');
const puko = document.getElementById("puko");
const barraLateral = document.querySelector(".barra-lateral");
const spans = document.querySelectorAll("span");
const palanca = document.querySelector(".switch");
const circulo = document.querySelector(".circulo");
const menu = document.querySelector(".menu");
const main = document.querySelector("main");
const edit_btn = document.querySelector(".editUser");
const avaliable_auction = document.querySelector(".available-auctions");
const log_icon = document.querySelector(".logOut-icon");

function toggleLateralMenu() {
    if (!barraLateral || !menu) return; // Verifica si los elementos existen
    barraLateral.classList.toggle("max-barra-lateral");
    if (barraLateral.classList.contains("max-barra-lateral")) {
        menu.children[0].style.display = "none";
        menu.children[1].style.display = "block";
    } else {
        menu.children[1].style.display = "none";
        menu.children[0].style.display = "block";
    }
}

function toggleDarkMode() {
    let body = document.body;
    body.classList.toggle("dark-mode");
    circulo.classList.toggle("prendido");
}

function logOutUser() {
    Swal.fire({
        title: "Are you sure?",
        text: "Your session will be closed!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ccb043",
        iconColor: "#ccb043",
        color: "#fff",
        cancelButtonColor: "#d33",
        background: "#252525",
        heightAuto: false,
        confirmButtonText: "Yes, get me out!",
    }).then((result) => {
        if (result.isConfirmed) {
            document.body.setAttribute("transition-style", "out:circle:hesitate");
            sessionStorage.clear();
            setTimeout(() => {
                window.location.href = '/index.html';
            }, 2500);
        }
    });
}

function formatMoney(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function redirectToAvailableAuction() {
    window.location.href = "/html/avaliable_auction.html";
}

document.addEventListener("DOMContentLoaded", () => {
    menu.addEventListener("click", toggleLateralMenu);
    palanca.addEventListener("click", toggleDarkMode);
    log_icon.addEventListener("click", logOutUser);
    avaliable_auction.addEventListener("click", redirectToAvailableAuction);
});

// Exporta las funciones para usarlas en las pruebas
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        toggleLateralMenu,
        toggleDarkMode,
        logOutUser,
        formatMoney,
        redirectToAvailableAuction,
    };
}
