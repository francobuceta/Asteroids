//Balas 

class Balas {
    constructor(posicionNave, angulo) {
        this.posicion = createVector(posicionNave.x, posicionNave.y);
        this.velocidad = p5.Vector.fromAngle(angulo);
        this.velocidad.mult(10); //Multiplico la velocidad de las balas
    }
    
    actualizar(){
        this.posicion.add(this.velocidad);
    };

    render() {
        push();
        stroke(255);
        strokeWeight(4);
        point(this.posicion.x, this.posicion.y);
        pop();
    };

    colision(asteroid) {
        let distancia = dist(this.posicion.x, this.posicion.y, asteroid.posicion.x, asteroid.posicion.y);
        if (distancia < asteroid.tamanio) {
            return true;
        } else {
            return false;
        }
    };

    fueraDePantalla() {
        if (this.posicion.x > width || this.posicion.x < 0) {
            return true;
        }
        if (this.posicion.y > height || this.posicion.y < 0) {
            return true;
        } else {
            return false;
        }
    }
}   // Chequear porque esto no tiene tamanio