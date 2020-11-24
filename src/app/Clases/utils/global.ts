import { Recarga } from './../BEANs/recarga';

export class global {

  public recarga: Recarga;

  public fechaActual: Date = new Date();

  private static instance: global;
  static getInstance(): global {
    if (this.instance == null)
      this.instance = new global();
    return this.instance;
  }


  //recibe la fecha en dd/mm/YYYY HH:mm y regresa un DATE
  convertSFechaToDate(value) {
    let fechaS: string = value;

    if (fechaS != null && fechaS != undefined) {
      let arr: Array<string> = fechaS.split("/");

      if (arr != null) {
        var dia: number = Number(arr[0]);
        var mes: number = Number(arr[1]);

        var aniohora: string = arr[2];//2017 00:00
        var arranioHora: Array<string> = aniohora.split(" ");//separo el año y la hora
        var anio: number = 0;

        var tiempo: string = "";
        var arrTiempo: Array<string> = [];
        var horas = "0";
        var minutos = "0";


        if (arranioHora.length > 0) {
          anio = Number(arranioHora[0]);

          if (arranioHora.length == 2) {
            tiempo = arranioHora[1];//00:00
          }

          if (tiempo.length > 0) {
            arrTiempo = tiempo.split(":");
          }
        }

        if (arrTiempo.length > 0) {
          horas = arrTiempo[0];
          minutos = arrTiempo[1];
        }

        return new Date(anio, mes - 1, dia, Number(horas), Number(minutos));
      }
    }
    else {
      return null;
    }
  }


  //recibe la fecha en dd/mm/YYYY HH:mm y regresa un DATE
  convertSFechaTimeToSFecha(value) {
    let fechaS: string = value;

    if (fechaS != null && fechaS != undefined) {
      let arr: Array<string> = fechaS.split("/");
      let anioTime = arr[2];
      let arrAnio: Array<string> = anioTime.split(" ");
      let anio = null;
      if (arrAnio != null && arrAnio != undefined) {
        anio = arrAnio[0];
      }

      let fechaReturn: string = arr[0] + "/" + arr[1] + "/" + anio;
      if (arr != null) {
        return fechaReturn;
      }
    }
    else {
      return null;
    }
  }

  /*A partir de una cadena string (con formato dd/mm/aaaa H:m:s) devuelve un objeto Date*/
  public stringToDate(f: string): Date {
    let fechaConvertida: Date;
    if (f != null && f !== 'undefined' && f.length > 0) {
      fechaConvertida = new Date();
      fechaConvertida.setDate((Number(f.slice(0, 2))));
      fechaConvertida.setMonth(Number(f.slice(3, 5)) - 1);
      fechaConvertida.setFullYear(Number(f.slice(6, 10)));
      fechaConvertida.setHours(Number(f.slice(11, 13)));
      fechaConvertida.setMinutes(Number(f.slice(14, 16)));
      return fechaConvertida;
    }
  }

  public dateToString(fecha: Date, conHora: boolean): string {
    if (fecha == null) {
      return '';
    }
    const dia = this.zeroPad('' + fecha.getDate(), 2);
    const mes = this.zeroPad('' + (fecha.getMonth() + 1), 2);
    const anio = this.zeroPad('' + fecha.getFullYear(), 4);
    const hora = this.zeroPad('' + fecha.getHours(), 2);
    const min = this.zeroPad('' + fecha.getMinutes(), 2);
    const seg = this.zeroPad('' + fecha.getSeconds(), 2);

    let fechaString = dia + '/' + mes + '/' + anio;
    if (conHora) {
      fechaString += ' ' + hora + ':' + min;
    }

    return fechaString;
  }

    /*Añade ceros a la izquierda en la cadena de texto numero, según la cantidad de caracteres que indique el parámetro maxLength*/
    private zeroPad(numero: string, maxLength: number): string {
      let stringToReturn = '' + numero;
      while (stringToReturn.length < maxLength) {
        stringToReturn = '0' + stringToReturn;
      }
      return stringToReturn;
    }

  //recibe fecha 17/11/2017 00:00
  formatFechaTimeToddmmyyyy(value) {
    let fechaS: string = value;
    var fecha: string = "";

    if (fechaS != null && fechaS != undefined && fechaS != "") {
      let arr: Array<string> = fechaS.split(" ");

      if (arr != null) {
        fecha = arr[0];
      }
    }
    return fecha;
  }

  //recibe un DATE regresa una cadena YYY/mm/dd
  convertDateToSFecha(fecha: Date) {
    let dia: Number = null;
    let diaS: string = "";

    let mes: number = null;
    let mesS: string = "";

    let anio: Number = null;


    if (fecha != null || fecha != undefined) {
      dia = fecha.getDate();
      mes = fecha.getMonth() + 1;
      anio = fecha.getFullYear();

      if (dia < 10) { diaS = "0" + dia; } else { diaS = dia + ""; }
      if (mes < 10) { mesS = "0" + mes; } else { mesS = mes + ""; }

      return diaS + "/" + mesS + "/" + anio;
    }
    else {
      return "";
    }

  }

  convertDateToSFechaTime(fecha: Date) {
    let dia: Number = null;
    let diaS: string = "";

    let mes: number = null;
    let mesS: string = "";

    let anio: Number = null;
    let hora: number = null;
    let minutos: number = null;

    if (fecha != null || fecha != undefined) {
      dia = fecha.getDate();
      mes = fecha.getMonth() + 1;
      anio = fecha.getFullYear();
      hora = fecha.getHours();
      minutos = fecha.getMinutes();

      if (dia < 10) { diaS = "0" + dia; } else { diaS = dia + ""; }
      if (mes < 10) { mesS = "0" + mes; } else { mesS = mes + ""; }

      return diaS + "/" + mesS + "/" + anio + " " + hora + ":" + minutos;
    }
    else {
      return null;
    }
  }

  convertFt3ToM3(valor) {
    if (valor != null && valor != undefined) {
      let metros3 = valor * 0.0283168;
      return metros3;
    }
    else {
      return null;
    }
  }

  convertPesoTotalToPorcent(peso, capacidad) {
    let retorno = Math.round((peso * 100) / capacidad);
    return Number(retorno.toFixed(1));
  }

  getAnioActual() {
    let fecha: Date = new Date();
    let anio = fecha.getFullYear();
    return anio;
  }

  async wait(ms): Promise<any> {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  dentroDeMargenError(avanceReal, avancePlaneado, ponderacion): boolean {
    avanceReal = this.round2Decimals(avanceReal)
    avancePlaneado = this.round2Decimals(avancePlaneado)

    if (avanceReal == avancePlaneado)
      return true;
    else if (avanceReal > avancePlaneado)
      return true;
    else if (avanceReal < avancePlaneado) {
      let x = avancePlaneado - avanceReal
      if (x <= ponderacion) {
        return true;
      }
      return false;
    }
    else
      return false;
  }

  round2Decimals(number) {
    return Math.round((number + Number.EPSILON) * 100) / 100
  }

  sameDay(d1: Date, d2: Date) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }


  quitarHoraFecha(fecha: Date): Date {
    if (fecha != null)
      return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate())
    else
      return null;

  }
}
