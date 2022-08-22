let nave;
let asteroides = [];
let balas = [];
let frames = []; 
let numFrames = 45;
let whichFrame = 1;
let puntaje = 0;
let level = 1;
const esconderSection = document.getElementById("section");
const btnComenzar = document.getElementById("comenzar");
let canvas;


function preload() {
    for(let i = 1; i < numFrames; i++) {
        let filename = "frames/" + "Frames " + "(" + i + ")" + ".png";
        let frame = loadImage(filename);
        frames.push(frame);
    }
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    nave = new Nave(createVector(width / 2, height / 2), 20, 0, 0, createVector(1, 0), false, 3); //Llamo al contructor del objeto nave
    asteroides.push (new Asteroid()); 
    canvas.style("display", "none");
    console.log(nave.vidas);
}


btnComenzar.onclick = function setup() {
    createCanvas(windowWidth, windowHeight);
    esconderSection.style.setProperty("display", "none", "important");
    nave = new Nave(createVector(width / 2, height / 2), 20, 0, 0, createVector(1, 0), false, 3);
    asteroides.push (new Asteroid());

    for (let i = 0; i < 5 + level; i++) {
        asteroides.push (new Asteroid());
    }  

    canvas.style("display", "block");

    reseteo()
}


function draw() {
    background(0);
    
    for (let i = 0; i < asteroides.length; i++) { //Recorro el array de asteroides en el dibujo
        if (nave.chocar(asteroides[i])) {
            imageMode(CENTER);
            image(frames[whichFrame], nave.posicion.x, nave.posicion.y);
            whichFrame += 1;

            if (whichFrame === frames.length) {
                whichFrame = 1;
            }
            
            nave.posicion = createVector(width/2, height/2);
            nave.velocidad = createVector(1, 0);
            nave.vidas--;
            puntaje += 30;
            
            if (asteroides[i].tamanio > 20) {
                let newAsteroids = asteroides[i].romper();
                asteroides = asteroides.concat(newAsteroids);
            }
            asteroides.splice(i, 1);
            break;
        }
        asteroides[i].render();
        asteroides[i].actualizar();
        asteroides[i].bordes();
    }
    
    for (let i = balas.length - 1; i >= 0; i--) { //Recorro el array de balas en el dibujo
        balas[i].render();
        balas[i].actualizar();
        
        if (balas[i].fueraDePantalla()) {
            balas.splice(i, 1);
        } else {
            for (let j = asteroides.length - 1; j >= 0; j--) { //Bucle para la colision (dividir asteroide en dos)
                if (balas[i].colision(asteroides[j])) {
                    if (asteroides[j].tamanio > 20) {
                        let newAsteroids = asteroides[j].romper();
                        asteroides = asteroides.concat(newAsteroids);
                    }
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
    text("SCORE: " + puntaje, 1050, 50); // Textos de puntos y vidas en el dibujo.
    fill(255, 255, 255);
    textSize(35);
    text("LIVES: " + nave.vidas, 50, 50);
    text("LEVEL " + level, width/2, 600);
    nivel();
    gameOver();
}

console.log(level);
console.log(asteroides.length);

//Teclas de interaccion
function keyPressed() {
    if (key == " ") {  
        balas.push (new Balas(nave.posicion, nave.head));
    }
    else if (keyCode == RIGHT_ARROW) {
        nave.establecerRotacion(0.1);
    } else if (keyCode == LEFT_ARROW) {
        nave.establecerRotacion(-0.1);
    } else if (keyCode == UP_ARROW) {
        nave.empuje(true);
    }
}

function keyReleased() { //La nave no rota cuando se levanta la tecla
    nave.establecerRotacion(0);
    nave.empuje(false);
}


function nivel() {
    if (asteroides.length == 0) {
        for (let i = 0; i < 5 + level; i++) {
            asteroides.push (new Asteroid());
        }
        level++;
    }
}

function reseteo() {
    nave.vidas = 3;
    puntaje = 0;
    level = 1;
} 

function gameOver() {
    if (nave.vidas == 0) {
        canvas.style("display", "none");
        esconderSection.style.setProperty("display", "block", "important");
    }
}