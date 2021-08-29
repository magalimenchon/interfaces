document.addEventListener("DOMContentLoaded", IniciarPagina);

function IniciarPagina(){
    "use strict";

/*---------------start------------------------*/
let matriz = [];
let fila = 3;
let columna = 3;

DefinirMatriz(fila, columna);
MaxMatriz();
MaxFilasParesMenorFilasImpares();
PromedioDeCadaFila();

/*---------------functions------------------------*/

/*Repaso Javascript:

a - Definir una matriz de 100 elementos x 100 elementos
y completarla con valores enteros random,
y resuelva los siguientes incisos:  */

    function DefinirMatriz(fila, columna){
        for(let y=0; y < fila; y++){
            matriz[y] = [];
            for(let x=0; x < columna; x++){
                matriz[y][x] = Math.floor(Math.random() * 10000 + 1);
            }
        }
        console.log(matriz);
    }


//b - Escribir una función que retorne el valor máximo de toda la matriz 

    function MaxMatriz(){

        let max =  matriz[0][0];

        for(let y=0; y < fila; y++){
            for(let x=0; x < columna; x++){
                if(matriz[y][x] > max){
                    max = matriz[y][x];
                }
            }
        }
        console.log("El valor máximo de la matriz es: ", max);
    }


/*c - Escribir una función que retorne el valor máximo contenido en las filas pares
y el valor mínimo en las filas impares */

    function MaxFilasParesMenorFilasImpares(){

        let maxFila =  matriz[0][0];
        let minFila =  matriz[0][0];

        for(let y=0; y < fila; y++){
            for(let x=0; x < columna; x++){
                //Fila par (Inicia en la 2da fila)
                if((y % 2 !== 0) && (matriz[y][x] > maxFila)){
                    maxFila = matriz[y][x];
                }
                //Fila impar (Inicia en la 1ra fila)
                else if( (y % 2 == 0) && (matriz[y][x] < minFila)){
                    minFila = matriz[y][x];
                }
            }
        }
        console.log("El valor máximo de las filas pares es: ", maxFila);
        console.log("El valor mínimo de las filas impares es: ", minFila);
    }


/*d - Calcular el valor promedio de cada fila y guardarlos en un arreglo. */
    function PromedioDeCadaFila(){

        let promedioFila =  0;
        let sumatoria = 0;
        let promedios = [];

        for(let y=0; y < fila; y++){
            for(let x=0; x < columna; x++){
                sumatoria += matriz[y][x]; 
            }
            promedioFila = sumatoria / fila;
            promedios.push(promedioFila);
            sumatoria = 0;
        }
        console.log("El promedio de cada fila es: ", promedios);
    }

}