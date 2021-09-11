document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    //---Elements---

    //Canvas
    const canvas = document.querySelector('#js-canvas');
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // boton select
    const selectButton = document.getElementById("js-select-filters");

    //Saturation Filter
    //const quantityCompositionColor = 3;
    const coefficient = 0.6;

    //---Functions---

    //#regionSaturationFilter

    function saturationFilter() {

        const imageData = ctx.getImageData(0, 0, width, height);
        let r, g, b, a;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                r = getRed(imageData, x, y);
                g = getGreen(imageData, x, y);
                b = getBlue(imageData, x, y);
                a = getOpacity(imageData, x, y);

                let hsl = rgb_to_hsl_convertion(r, g, b);
                if (x == 0 && y == 0) {
                    console.log(r, g, b);
                    console.log(hsl);
                }
                //Incremento el porcentaje de saturación
                //hsv[1] = increaseSaturation(hsv[1]);
                hsl[1] = hsl[1] + (hsl[1] * coefficient);
                let rgb = hsl_to_rgb_convertion(hsl);
                if (x == 0 && y == 0) {
                    console.log(hsl);
                    console.log(rgb);
                }
                setPixel(imageData, x, y, rgb[0], rgb[1], rgb[2], a);
            }
        }
        /* Dibujar la información de píxeles en el lienzo.
           Si se proporciona un rectángulo solo se pintan los píxeles del mismo. */
        ctx.putImageData(imageData, 0, 0);
    }

    function rgb_to_hsl_convertion(r, g, b) {
        //Se divide cada parámetro de color por 255.0 (para que quede flotante)
        r = r / 255.0;
        g = g / 255.0;
        b = b / 255.0;

        //Se obtiene cuál es el valor mínimo y máximo entre los 3 parámetros
        let minimum = Math.min(r, g, b);
        let maximum = Math.max(r, g, b);

        let h, s, l;
        //Se calcula la diferencia entre el máximo y el mínimo:
        let substraction = maximum - minimum;

        //Componente Matiz
        if (substraction == 0) {
            h = 0;
        }
        else if (maximum == r) {
            //red = 0º en Hue
            h = 60 * (((g - b) / substraction) % 6);
        }
        else if (maximum == g) {
            //green = 120º en Hue
            h = 60 * (((b - r) / substraction) + 2);
        }
        else if (maximum == b) {
            //green = 120º en Hue
            h = 60 * (((r - g) / substraction) + 4);
        }
        //Componente brillo
        l = (maximum + minimum) / 2;

        //Componente Saturación
        if (substraction == 0) {
            s = 0
        }
        else {
            s = substraction / (1.0 - Math.abs((2.0*l) - 1.0));
        }
        

        return [h, s, l];
    }

    function hsl_to_rgb_convertion(hsl) {
        //referencia: https://www.rapidtables.com/convert/color/hsl-to-rgb.html
        let h = hsl[0];
        let s = hsl[1];
        let l = hsl[2];
        let r, g, b, c, x, m;
        //deberia ser s <= 1.0 y l <= 1.0
        if (h >= 0 && h < 360.0 && s >= 0.0 && s <= 100.0 && l >= 0.0 && l <= 100.0) {
            //if (h >= 0 && h < 360.0 || 0.0 >= s || s <= 1.0 && 0.0 >= v || v <= 1.0) {
            c = (1.0 - Math.abs((2 * l) - 1)) * s;
            x = c * (1.0 - Math.abs((h / 60.0) % 2.0 - 1.0));
            m = l - c / 2;
            if (h >= 0.0 && h < 60.0) {
                r = c;
                g = x;
                b = 0;
            } else if (h >= 60.0 && h < 120.0) {
                r = x;
                g = c;
                b = 0;
            } else if (h >= 120.0 && h < 180.0) {
                r = 0;
                g = c;
                b = x;
            } else if (h >= 180.0 && h < 240.0) {
                r = 0;
                g = x;
                b = c;
            } else if (h >= 240.0 && h < 300.0) {
                r = x;
                g = 0;
                b = c;
            } else if (h >= 300.0 && h < 360.0) {
                r = c;
                g = 0;
                b = x;
            }
            r = Math.round((r + m) * 255);
            g = Math.round((g + m) * 255);
            b = Math.round((b + m) * 255);
        }

        return [r, g, b];
    }
    /*  function hsv_to_rgb_convertion(hsv) {
          //referencia: https://www.rapidtables.com/convert/color/hsv-to-rgb.html
          let h = hsv[0];
          let s = hsv[1];
          let v = hsv[2];
          let r, g, b, c, x, m;
          if (h >= 0 && h < 360.0 &&  s >= 0.0 && s <= 100.0 && v >= 0.0 && v <= 100.0) {
          //if (h >= 0 && h < 360.0 || 0.0 >= s || s <= 1.0 && 0.0 >= v || v <= 1.0) {
               c = v * s;
               x = c * (1.0 - Math.abs((h / 60.0) % 2.0 - 1.0));
               m = v - c;
              if (h >= 0.0 && h < 60.0) {
                  r = c;
                  g = x;
                  b = 0;
              } else if (h >= 60.0 && h < 120.0) {
                  r = x;
                  g = c;
                  b = 0;
              } else if (h >= 120.0 && h < 180.0) {
                  r = 0;
                  g = c;
                  b = x;
              } else if (h >= 180.0 && h < 240.0) {
                  r = 0;
                  g = x;
                  b = c;
              } else if (h >= 240.0 && h < 300.0) {
                  r = x;
                  g = 0;
                  b = c;
              } else if (h >= 300.0 && h < 360.0) {
                  r = c;
                  g = 0;
                  b = x;
              }
              r = (r+m)*255;
              g = (g+m)*255;
              b = (b+m)*255;
          }
  
          return [r,g,b];
      }
  */
    function increaseSaturation(s) {
        return s + s * coefficient;
    }
    /*
        function rgb_to_hsv_convertion(r, g, b) {
            //Se divide cada parámetro de color por 255.0 (para que quede flotante)
            r = r / 255.0;
            g = g / 255.0;
            b = b / 255.0;
    
            //Se obtiene cuál es el valor mínimo y máximo entre los 3 parámetros
            let minimum = Math.min(r, g, b);
            let maximum = Math.max(r, g, b);
    
            let h, s, v;
            //Se calcula la diferencia entre el máximo y el mínimo:
            let substraction = maximum - minimum
    
            //Componente Matiz
            if (substraction == 0) {
                h = 0;
            }
            else if (maximum == r) {
                //red = 0º en Hue
               h = (60 * ((g - b) / substraction) + 360) % 360;
               //h = 60 * (((g - b) / substraction) % 6);
            }
            else if (maximum == g) {
                //green = 120º en Hue
                h = (60 * ((b - r) / substraction) + 120) % 360;;
                //h = 60 * (((r - g) / substraction) + 4);
            }
    
            //Componente Saturación
            if (maximum == 0) {
                s = 0
            }
            else {
                s = (substraction / maximum) * 100;
                //s = (substraction / maximum);
            }
            v = maximum * 100;
            //v = maximum;
    
            return [h, s, v];
        }*/

    function setPixel(imageData, x, y, r, g, b, a) {
        /*Cada pixel está conformado por 4 parámetros de color, contenidos consecutivamente
        dentro del arreglo imageData. La relación de acceso entre la posición dentro del arreglo y la
        matriz gráfica está dada por la posición dentro de la fila y columna de cada pixel en la matriz
        y el ancho de la misma.*/
        const index = (x + y * imageData.width) * 4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
    }

    function getRed(imageData, x, y) {
        //*************¿DEBERÍAN SER CONSTANTES EN VEZ DE LET?
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 0];
    }

    function getGreen(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 1];
    }

    function getBlue(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 2];
    }

    function getOpacity(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 3];
    }

    //#endRegion

    //#regionEvents
    selectButton.addEventListener('change', (e) => {
        if (e.target.value == "saturation")
            saturationFilter();
    });
    //#endRegion
});