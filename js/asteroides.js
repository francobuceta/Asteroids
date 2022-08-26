//Asteroids 

class Asteroid {
    constructor(posicion, tamanio) {
        this.tamanio = random(15, 50);
        
        if (posicion) {  //Posicion del asteroide
            this.posicion = posicion.copy();
        } else {
            this.posicion = createVector(random(width), random(height)); 
        }
    
        if (tamanio) {
            this.tamanio = tamanio * 0.5;
        } else {
            this.tamanio = random(15, 50);
        }

        this.velocidad = p5.Vector.random2D();//Obtener un vector aleatorio
        this.tamanioVertice = floor(random(5, 15));
        this.offset = []; //Array para cada uno de los vertices del asteroide y poder darle una mejor forma
        for (let i = 0; i < this.tamanioVertice; i++) {
            this.offset[i] = random(-this.tamanio * 0.5, this.tamanio * 0.5);
        }
    }
    
    actualizar() {
        this.posicion.add(this.velocidad);
    };

    render() {
        push();
        stroke(173, 71, 194);
        noFill();
        translate(this.posicion.x, this.posicion.y);
        beginShape(); //Empiezo la grabación de vértices para una figura
        for (let i = 0; i < this.tamanioVertice; i++) { //Añado forma al asteroide
            let angulo = map(i, 0, this.tamanioVertice, 0, TWO_PI); // Saco el angulo, TWO_PI = 360grados
            let a = (this.tamanio + this.offset[i]);
            let x = a * cos(angulo);
            let y = a * sin(angulo);
            vertex(x, y);
        }
        endShape(CLOSE); //Termina la grabación.
        pop();
    };

    bordes() {
        if (this.posicion.x > width + this.tamanio) {
            this.posicion.x = -this.tamanio;
        } else if (this.posicion.x < -this.tamanio) {
            this.posicion.x = width + this.tamanio;
        }
        if (this.posicion.y > height + this.tamanio) {
            this.posicion.y = -this.tamanio;
        } else if (this.posicion.y < -this.tamanio) {
            this.posicion.y = height + this.tamanio;
        }
    };

    romper() {
        let nuevoA = [];
        nuevoA[0] = new Asteroid(this.posicion, this.tamanio);
        nuevoA[1] = new Asteroid(this.posicion, this.tamanio);
        return nuevoA;
    };
}