//Balas 

class Balas {
    constructor(posicionNave, angulo) {
        this.posicion = createVector(posicionNave.x, posicionNave.y);
        this.velocidad = p5.Vector.fromAngle(angulo);
        this.velocidad.mult(10); //Multiplico la velocidad de las balas
    }
    
    actualizar(){  //Actualiza posicion y velocidad de las balas
        this.posicion.add(this.velocidad);
    };

    render() {  //Dibujo las balas
        push();
        stroke(255);
        strokeWeight(4);
        point(this.posicion.x, this.posicion.y); //Dibujo las balas como puntos.
        pop();
    };

    colision(asteroid) {  //Funcion de colision de las balas con los asteroides.
        let distancia = dist(this.posicion.x, this.posicion.y, asteroid.posicion.x, asteroid.posicion.y);
        
        if (distancia < asteroid.tamanio) {
            return true;
        } else {
            return false;
        }
    };

    fueraDePantalla() {  //Funcion que detecta cuando las balas salen de la pantalla.
        (this.posicion.x > width || this.posicion.x < 0) && true;
        (this.posicion.y > height || this.posicion.y < 0) ? true : false;
    }
}   