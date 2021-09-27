
class Tablero {

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.matrix = Array(width).fill(Array(height));
    }

    getMatrix() {
        return this.matrix;
    }
}
