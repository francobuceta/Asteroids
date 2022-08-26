//Nave

class Nave {
    constructor(posicion, tamanio, head, rotacion, velocidad, aceleracion, vidas, escudo) {
        this.posicion = posicion; //Posicion en medio de la pantalla
        this.tamanio = tamanio; //Tamaño de la nave
        this.head = head; //Cabeza de la nave
        this.rotacion = rotacion;
        this.velocidad = velocidad; //Velocidad de la nave
        this.aceleracion = aceleracion;
        this.vidas = vidas;
        this.escudo = escudo;
    }
    
    actualizar() {  //Actualiza lo que este haciendo la nave
        this.posicion.add(this.velocidad);
        this.velocidad.mult(0.99); //Agrega friccion a la velocidad
        this.aceleracion && this.acelerar();
        
        if (this.escudo > 0) {
            this.escudo -= 1;
        }
    };

    empuje(booleano) { //Empujar la nave
        this.aceleracion = booleano;
    };

    acelerar() {
        let fuerza = p5.Vector.fromAngle(this.head); //Vector que apunta en la direccion de la cabeza de la nave
        fuerza.mult(0.1);
        this.velocidad.add(fuerza);
    };

    render() {  //Dibujo la nave
        push(); //Guarda el estado actual de traslacion y rotacion
        translate(this.posicion.x, this.posicion.y); //Centrar al medio la nave
        rotate(this.head + PI / 2); //Rotacion de la nave       
        
        if (this.escudo > 0) {  //Color de relleno de la nave
            let colorEscudo = random(map(this.escudo, 0, tiempoEscudo, 255, 0), 255);
            fill(colorEscudo, colorEscudo, 255);
        } else {
            fill(0);
        };
        
        stroke(173, 71, 194); //Color a los bordes
        strokeWeight(3); //Grosor de los bordes
        triangle(-this.tamanio, this.tamanio, this.tamanio, this.tamanio, 0, -this.tamanio); //Darle forma de triangulo a la nave
        pop(); //Restaura el estado de traslacion y rotacion
    };

    establecerRotacion(a) {
        this.rotacion = a;
    };

    girar(){
        this.head += this.rotacion;
    };

    bordes() {  //Funcion para que cuando la nave pase los bordes vuelva a aparecer en el otro extremo.
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

    chocar(asteroid) {  //Funcion de colision con asteroides.
        if (this.escudo > 0) {
            return false;
        }
        
        let distancia = dist(this.posicion.x, this.posicion.y, asteroid.posicion.x, asteroid.posicion.y);
        
        if (distancia < this.tamanio + asteroid.tamanio) {
            return true;
        } else {
            return false;
        }
    };
}