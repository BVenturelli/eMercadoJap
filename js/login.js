document.addEventListener("DOMContentLoaded", function(e) {


    document.getElementById("userinfo").addEventListener("submit", (evento) => {

        evento.preventDefault();
        document.getElementById("user").value;
        localStorage.setItem("Usuario", document.getElementById("user").value);
        window.location.href = "index.html";
        sessionStorage.setItem("logged", true)
        return true;
    })
});
//en localStorage o sessionStorage nombre de usuario
// sessionStorage.setItem("Usuario", document.getElementById("user").value);
//el sessionStorage del comentario de la linea 15 se remplaza en la línea 8