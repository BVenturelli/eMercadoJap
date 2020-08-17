document.addEventListener("DOMContentLoaded", function(e) {

    document.getElementById("userinfo").addEventListener("submit", (evento) => {
        evento.preventDefault();
        window.location.href = "index.html";
        sessionStorage.setItem("logged", true)
        return true;
    })
});