
class Tablero {

    constructor(matX, matY, ctx) {
        let tamanioCelda = 70;
        let matrix = [];
        this.matX = matX;
        this.matY = matY;
        this.tamanioCelda = tamanioCelda;
        this.width = matX*tamanioCelda;
        this.height = matY*tamanioCelda;
        this.iniDibujoX = 50;
        this.iniDibujoY = 70;
        this.ctx = ctx;
        // esta bien crear la matriz en el constructor??
        for(let x=0; x < matX; x++){
            matrix[x] = [];
            for(let y=0; y < matY; y++){
                matrix[x][y] = null;
            }
        }
        this.matrix = matrix;
    }

    getMatrix() {
        return this.matrix;
    }

    //Busca la posible columna donde haya tirado la ficha, sino es válida retorna null
    getColumnaJugada(posXFicha, posYFicha){

        let posX = posXFicha - this.iniDibujoX;
        let posY = posYFicha;

        if(posY > this.iniDibujoY + this.tamanioCelda)
            return null;

        for (let column = 0; column < this.matX; column++) {
            if(posX >= column*this.tamanioCelda & posX < column*this.tamanioCelda + this.tamanioCelda){
                return column;
            }
        }
        return null;
    }

    //Busca en determinada columna un espacio libre,
    //iterando por filas, comenzando desde la última. Sino encuentra retorna null
    getEspacioLibreEnColumna(column){
        for (let row = this.matrix.height-1; row >= 0; row--) {
            if(this.matrix[row][column] == null){
                return this.matrix[row][column];
            }
        }
        return null;
    }

    drawTablero(){
        let radius = 30;

        // dibujo un rectangulo azul en la capa 2
        this.ctx.fillStyle = "rgba(80, 80, 255, 1)";
        this.ctx.fillRect(this.iniDibujoX, this.iniDibujoY, this.width, this.height);

        this.ctx.fillStyle = "rgba(255, 255, 255, 1)";

       //----------Habria que guardar cada circulo en la matriz?
        for (let x = 0; x < this.matX; x++) {
            for (let y = 0; y < this.matY; y++) {
                this.ctx.beginPath();
               
                this.ctx.arc((x * this.tamanioCelda) + (this.iniDibujoX + this.tamanioCelda/2),
                               (y * this.tamanioCelda) + (this.iniDibujoY + this.tamanioCelda/2), 
                               radius, 0, 2 * Math.PI);
                
                this.ctx.fill();
                this.ctx.closePath();
            } 
        }
    }

    // añade una ficha al tablero si esta cumple todas las condiciones
    addFicha(e, lastClickedFicha){
        if (lastClickedFicha != null){
            let column = this.getColumnaJugada(e.layerX, e.layerY);
            if(column != null){
                for (let row = 0; row < this.matY; row++){
                
                    if(this.matrix[column][row] !== null){
                        if(row == 0){
                            console.log("columna llena!!");
                            return;
                        }
                        let ficha = new Ficha((column * this.tamanioCelda) + (this.iniDibujoX + this.tamanioCelda/2),
                        ((row-1) * this.tamanioCelda) + (this.iniDibujoY + this.tamanioCelda/2),
                                    lastClickedFicha.getFill(), this.ctx);
                        this.matrix[column][row-1] = ficha;
                        ficha.draw();
                        return;
                    }
                    else{
                        if(row == this.matY-1){
                            let ficha = new Ficha((column * this.tamanioCelda) + (this.iniDibujoX + this.tamanioCelda/2),
                            (row * this.tamanioCelda) + (this.iniDibujoY + this.tamanioCelda/2),
                                        lastClickedFicha.getFill(), this.ctx);
                            this.matrix[column][row] = ficha;
                            ficha.draw();
                        }
                    }
                }
            }
            checkWin();
        }  
    }

    checkWin(){
        for (let x = 0; x < this.matX-1; x++) {

            for (let y = 0; y < this.matY-1; y++) {
                
                if (this.matrix[x][y].getJugador() != null && 
                this.matrix[x][y].getJugador().equals(this.matrix[x][y+1].getJugador())){
                    this.matrix[x][y].getJugador().addPuntos("y");
                    if(this.matrix[x][y].getJugador().getPuntos()){
                        
                    }

                }
                else if(this.matrix[x][y].getJugador() != null){
                    this.matrix[x][y].getJugador().resetPuntos("y");
                }



            }
        }
    }

    drawFichaEnTablero(drawX, drawY){

        let ficha = new Ficha(drawX * (widthPixelsTablero/maxX) + (widthPixelsTablero/maxX),
            drawY * (heightPixelsTablero/maxY) + (heightPixelsTablero/maxX), "#FF0000", this.ctx);
        
        ficha.draw();
        
    }
}
