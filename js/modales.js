//Modal 1
const abrirModal = document.querySelector(".btn-sobreJuego");
const modal = document.querySelector(".modal");
const cerrarModal = document.querySelector(".modal-close");
const modalContenedor = document.querySelector(".modal-container");

abrirModal.addEventListener("click", ()=> {
    modal.classList.add("modal-show");
});

cerrarModal.addEventListener("click", ()=> {
    modal.classList.remove("modal-show");
});

modalContenedor.addEventListener("click", (e)=> {
    e.stopPropagation();
});

modal.addEventListener("click", ()=> {
    cerrarModal.click();
});


//Modal 2
const abrirModal2 = document.querySelector(".btn-sobreMi");
const modal2 = document.querySelector(".modal2");
const cerrarModal2 = document.querySelector(".modal-close2");
const modalContenedor2 = document.querySelector(".modal-container2");

abrirModal2.addEventListener("click", ()=> {
    modal2.classList.add("modal-show2");
});

cerrarModal2.addEventListener("click", ()=> {
    modal2.classList.remove("modal-show2");
});

modalContenedor2.addEventListener("click", (e)=> {
    e.stopPropagation();
});

modal2.addEventListener("click", ()=> {
    cerrarModal2.click();
});