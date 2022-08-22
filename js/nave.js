//Nave

class Nave {
    constructor(posicion, tamanio, head, rotacion, velocidad, aceleracion, vidas) {
        this.posicion = posicion; //Posicion en medio de la pantalla
        this.tamanio = tamanio; //Tamaño de la nave
        this.head = head; //Cabeza de la nave
        this.rotacion = rotacion;
        this.velocidad = velocidad; //Velocidad de la nave
        this.aceleracion = aceleracion;
        this.vidas = vidas;
    }
    
    actualizar() {
        this.posicion.add(this.velocidad);
        this.velocidad.mult(0.99); //Agrega friccion a la velocidad
        if (this.aceleracion) { //Chequear si esta acelerando la nave
            this.acelerar();
        }
    };

    empuje(booleano) {
        this.aceleracion = booleano;
    };

    acelerar() {
        let fuerza = p5.Vector.fromAngle(this.head); //Vector que apunta en la direccion de la cabeza de la nave
        fuerza.mult(0.1);
        this.velocidad.add(fuerza);
    };

    render() {
        push(); //Guarda el estado actual de traslacion y rotacion
        translate(this.posicion.x, this.posicion.y); //Centrar al medio la nave
        rotate(this.head + PI / 2); //Rotacion de la nave       
        fill(0); //Fill 0 para que la nave tape las balas y se vean que salen de la cabeza
        stroke(173, 71, 194); //Le pongo bordes blancos a la nave
        strokeWeight(3);
        triangle(-this.tamanio, this.tamanio, this.tamanio, this.tamanio, 0, -this.tamanio); //Darle forma a la nave
        pop(); //Restaura el estado de traslacion y rotacion
    };

    establecerRotacion(a) {
        this.rotacion = a;
    };

    girar(){
        this.head += this.rotacion;
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

    chocar(asteroid) {
        let distancia = dist(this.posicion.x, this.posicion.y, asteroid.posicion.x, asteroid.posicion.y);
        if (distancia < this.tamanio + asteroid.tamanio) {
            return true;
        } else {
            return false;
        }
    };
}