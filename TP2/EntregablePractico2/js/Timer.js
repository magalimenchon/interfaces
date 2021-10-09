class Timer {

    constructor() {
        this.timerRender = document.querySelector('#js-timer');
        this.actualizacion = null;
    }

    getTiempo(tiempoLimite){
        let now = new Date();
        let remainTime = (tiempoLimite - now + 1000) / 1000;
        //los segundos van de 0 a 60
        //asigna un 0 adelante para los numeros < a 10, y para los > solo toma los últimos 2 dígitos.
        let segundos =  ( '0' + Math.floor(remainTime % 60)).slice(-2);
        //Divimos por 60 porque hay 60 segundos en 1 minuto
        let minutos =  ( '0' + Math.floor(remainTime / 60 % 60)).slice(-2);
        //Divimos por 3660 porque hay 3600 segundos en 1 hora, y hay 24 horas en 1 día
        let horas =  ( '0' + Math.floor(remainTime / 3660 % 24)).slice(-2);

        return {
            remainTime, segundos, minutos, horas
        }
    }

    countdown(tiempoLimite, mensajeStop){

        this.actualizacion = setInterval(() =>{

            let tiempoActual = this.getTiempo(tiempoLimite);
            let hora = tiempoActual.horas;
            let minuto = tiempoActual.minutos;
            let segundos = tiempoActual.segundos;
            this.timerRender.innerHTML = hora + ":" + minuto + ":" + segundos;
            
            //Deja de contar hacia atras cuando se agotan los milisegundos.
            //se quita el timer y se muestra el mensaje
            if(tiempoActual.remainTime <= 1){
                clearInterval(this.actualizacion);
                this.timerRender.innerHTML = mensajeStop;
            }

        }, 1000);
    }

    resetTimer(){
        clearInterval(this.actualizacion);
    }
}