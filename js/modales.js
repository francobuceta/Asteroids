//Modal 1
const abrirModal = document.querySelector(".btn-sobreJuego");
const modal = document.querySelector(".modal");
const cerrarModal = document.querySelector(".modal-close");

abrirModal.addEventListener("click", (e)=> {
    e.preventDefault();
    modal.classList.add("modal-show");
});

cerrarModal.addEventListener("click", (e)=> {
    e.preventDefault();
    modal.classList.remove("modal-show");
});

//Modal 2
const abrirModal2 = document.querySelector(".btn-sobreMi");
const modal2 = document.querySelector(".modal2");
const cerrarModal2 = document.querySelector(".modal-close2");

abrirModal2.addEventListener("click", (e)=> {
    e.preventDefault();
    modal2.classList.add("modal-show2");
});

cerrarModal2.addEventListener("click", (e)=> {
    e.preventDefault();
    modal2.classList.remove("modal-show2");
});
