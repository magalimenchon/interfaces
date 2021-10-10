class Timer {

    /**
     * @description Modelo de instancias de objetos de tipo temporizador
     */
    constructor() {
        this.timerRender = document.querySelector('#js-timer');
        this.actualizacion = null;
        this.timeOut = false;
    }

    /**
     * @description obtiene el tiempo restante, segundos, minutos y horas calculando un diferencial
     * entre este tiempo dado con segundos y el tiempo en segundos en el momento actual
     * @param {integer} tiempoLimite segundos que va variando conforme al intervalo de conteo
     * @returns objeto tipo @see Object con integer tiempo restante, integer segundos,
     * integer minutos e integer horas
     */
    getTiempo(tiempoLimite) {
        let now = new Date();
        let tiempoRestante = (tiempoLimite - now + 1000) / 1000;
        //los segundos van de 0 a 60
        //asigna un 0 adelante para los numeros < a 10, y para los > solo toma los últimos 2 dígitos.
        let segundos = ('0' + Math.floor(tiempoRestante % 60)).slice(-2);
        //Dividimos por 60 porque hay 60 segundos en 1 minuto
        let minutos = ('0' + Math.floor(tiempoRestante / 60 % 60)).slice(-2);
        //Dividimos por 3660 porque hay 3600 segundos en 1 hora, y hay 24 horas en 1 día
        let horas = ('0' + Math.floor(tiempoRestante / 3660 % 24)).slice(-2);

        return {
            tiempoRestante, segundos, minutos, horas
        }
    }

    /**
     * @description Por cada intervalo de 1 segundo obtiene el tiempo actual que contiene el
     * tiempo restante y los respectivos segundos, minutos y horas y lo renderiza por pantalla.
     * Si el tiempo llegó a 0, detiene el temporizador y actualiza el atributo de control de tiempo
     * límite para indicar que se cumplió 
     * @param {integer} tiempoLimite cantidad de tiempo inicial dado por el momento actual + incremento temporal
     */
    iniciarCuentaRegresiva(tiempoLimite) {

        this.actualizacion = setInterval(() => {

            let tiempoActual = this.getTiempo(tiempoLimite);
            let hora = tiempoActual.horas;
            let minuto = tiempoActual.minutos;
            let segundos = tiempoActual.segundos;
            this.timerRender.innerHTML = hora + ":" + minuto + ":" + segundos;

            //Deja de contar hacia atras cuando se agotan los milisegundos.
            //se quita el timer y se muestra el mensaje
            if (tiempoActual.tiempoRestante <= 1) {
                this.stopTimer();
                this.timeOut = true;
            }

        }, 1000);
    }

    /**
     * @description limpia el intervalo de tiempo parando el temporizador
     */
    stopTimer() {
        clearInterval(this.actualizacion);
    }

    /**
     * @description Controla que el contador llegue a 0
     * @returns boolean si se cumplió el tiempo límite
     */
    isTimeOut(){
        return this.timeOut;
    }

    /**
     * @description Restaura el timer actualizando al iniciarlo que no se cumplió el tiempo límite
     */
    resetTimeOut(){
        this.timeOut = false;
    }
}