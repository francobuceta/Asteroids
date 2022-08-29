let nave;
let asteroides = [];
let balas = [];
let frames = []; 
let numFrames = 45;
let elementoFrame = 1;
let puntaje;
let puntajeAlto;
let nivel = 0;
let canvas;
let tiempoEscudo = 240;
const guardarPuntaje = "mayorPuntaje";
const esconderSection = document.getElementById("section");
const esconderFooter = document.getElementById("footer");
const btnComenzar = document.getElementById("comenzar");
const btnPuntaje = document.getElementById("mayorPuntaje");
const contenedor = document.getElementById("contenedor");

function preload() {
    for(let i = 1; i < numFrames; i++) {  //Cargo frames de imagenes para explosion
        let archivo = "frames/" + "Frames " + "(" + i + ")" + ".png";
        let frame = loadImage(archivo);
        frames.push(frame);
    }
};

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    nave = new Nave(createVector(width / 2, height / 2), 20, 0, 0, createVector(1, 0), false, 3, tiempoEscudo); //Llamo al contructor del objeto nave
    asteroides.push (new Asteroid()); 
    canvas.style("display", "none");
};

btnComenzar.onclick = function setup() {
    createCanvas(windowWidth, windowHeight);
    ocultarSecciones();
    nave = new Nave(createVector(width / 2, height / 2), 20, 0, 0, createVector(1, 0), false, 3, tiempoEscudo);
    asteroides.push (new Asteroid());

    for (let i = 0; i < 8 + nivel; i++) {
        asteroides.push (new Asteroid());
    }  

    canvas.style("display", "block");
    puntaje = 0;
    traerStorage();
    reseteo();
};

function draw() {
    background(0);
    
    for (let i = 0; i < asteroides.length; i++) { //Recorro el array de asteroides en el dibujo
        if (nave.chocar(asteroides[i])) {
            explosion();
            nave.posicion = createVector(width/2, height/2);
            nave.velocidad = createVector(1, 0);
            nave.vidas--;
            nave.escudo = tiempoEscudo; //Se activan los escudos
            puntaje += 20;

            if (asteroides[i].tamanio > 20) {
                let nuevosAsteroides = asteroides[i].romper();
                asteroides = asteroides.concat(nuevosAsteroides);
            }

            setearStorage();
            asteroides.splice(i, 1);
            break;
        }
        asteroides[i].render();
        asteroides[i].actualizar();
        asteroides[i].bordes();
    }
    
    for (let i = balas.length - 1; i >= 0; i--) {  //Recorro el array de balas en el dibujo
        balas[i].render();
        balas[i].actualizar();
        
        if (balas[i].fueraDePantalla()) {
            balas.splice(i, 1);
        } else {
            for (let j = asteroides.length - 1; j >= 0; j--) {  //Bucle para la colision (dividir asteroide en dos)
                if (balas[i].colision(asteroides[j])) {
                    if (asteroides[j].tamanio > 20) {
                        let nuevosAsteroides = asteroides[j].romper();
                        asteroides = asteroides.concat(nuevosAsteroides);
                    }
                    setearStorage();
                    asteroides.splice(j, 1);
                    balas.splice(i, 1);
                    puntaje += 40;
                    break;
                }
            }
        }
    }
    nave.render();
    nave.girar();
    nave.actualizar();
    nave.bordes();
    escribirTextos();
    aumentoNivel();
    gameOver();
};

//Teclas de interaccion
function keyPressed() {
    switch (keyCode) {
        case 74:
            balas.push (new Balas(nave.posicion, nave.head));
            break;
        case 68:
            nave.establecerRotacion(0.1);
            break;
        case 65:
            nave.establecerRotacion(-0.1);
            break;
        case 87:
            nave.empuje(true);
            break;
    }
};

function keyReleased() {  //La nave no rota cuando se levanta la tecla.
    nave.establecerRotacion(0);
    nave.empuje(false);
};

//Aumentar nivel y poner escudos.
function aumentoNivel() {  
    if (asteroides.length == 0) {
        for (let i = 0; i < 8 + nivel; i++) {
            asteroides.push (new Asteroid());
        }
        nivel++;
        nave.escudo = tiempoEscudo;
    }
};

//Resetear los valores del juego.
function reseteo() {
    nave.vidas = 3;
    puntaje = 0;
    nivel = 0;
    asteroides = [];
}; 

// Salir del canvas cuando se pierde.
function gameOver() {
    if (nave.vidas == 0) {
        canvas.style("display", "none");
        mostrarSecciones();
    }
};

//Fetch
btnPuntaje.addEventListener("click", ()=> {
    fetch("./js/data.json")
    .then((response) => response.json())
    .then((data) => {
        mostrarPuntos(data);
    })
});

function mostrarPuntos(array) {  //Mostrar datos alojados en data.json.
    contenedor.innerHTML = "";
    array.forEach((persona) => {
            const informacion = `
            <div style= 'padding: 10px'>
                <p>Nombre: ${persona.nombre}</p>
                <p>Puntaje: ${persona.puntaje}</p><br>
            </div>`
            contenedor.innerHTML += informacion;
    }) 
    contenedor.classList.toggle("ocultar");
};

//Mostrar y ocultar las diferentes secciones.
function ocultarSecciones() {
    esconderSection.style.setProperty("display", "none", "important");
    esconderFooter.style.setProperty("display", "none", "important");
    btnPuntaje.style.setProperty("display", "none", "important");
    contenedor.style.setProperty("display", "none", "important");
};

function mostrarSecciones() {
    esconderSection.style.setProperty("display", "block", "important");
    esconderFooter.style.setProperty("display", "block", "important");
    btnPuntaje.style.setProperty("display", "", "important"); 
    contenedor.style.setProperty("display", "", "important");
};

//Storage.
function setearStorage() {  //Establecer puntaje en local storage.
    if (puntaje > puntajeAlto) { 
        puntajeAlto = puntaje;
        localStorage.setItem(guardarPuntaje, puntajeAlto);
    }; 
};

function traerStorage() {  //Traer el puntaje mas alto del local storage.
    let traerPuntaje = localStorage.getItem(guardarPuntaje); 
    traerPuntaje == null ? puntajeAlto = 0 : puntajeAlto = parseInt(traerPuntaje);
};

//Dibujar los textos en el canvas.
function escribirTextos() {
    text("SCORE: " + puntaje, width/2, 50); 
    fill(255, 255, 255);
    textSize(35);
    text("LIVES: " + nave.vidas, width/20, 50);
    text("BEST: " + puntajeAlto, width/2 + 450, 50);
    text("LEVEL " + nivel, width/2, height - 20);
};

//Mostrar los frames de explosion cuando colisiona la nave.
function explosion() {
    imageMode(CENTER);
    image(frames[elementoFrame], nave.posicion.x, nave.posicion.y);
    elementoFrame += 1;
    
    if (elementoFrame === frames.length) {
        elementoFrame = 1;
    };
};