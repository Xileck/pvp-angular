/**
 * Created by D256V on 07/11/2017.
 */
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class ServiciosGeneralesService {
  // Boleano que hace que el loader sea visible o no
  public loaderVisibility: boolean;
  // Guarda el nombre de la vista que está viendo el usuario
  public currentViewName: string;
  // Boleano que hace que el loader sea visible o no
  public displaySlideMenu: boolean;
  /*Constantes*/
  public readonly FormatoF_ddmmaa = 'dd/mm/aaaa';
  public readonly FormatoF_aammdd = 'aaaa-mm-dd';

  constructor(private router: Router) {
    this.loaderVisibility = false;
    this.currentViewName = '';
    this.displaySlideMenu = false;
  }


  /*--- FUNCIONES ---*/

  /*Hace visible o no al loader de la página.
  params:
    visible - True para hacerlo visible, false para ocultarlo.*/
  public toggleLoader(visible: boolean): void {
    this.loaderVisibility = visible;
  }

  /*Abre o cierra el menú lateral*/
  public togleSlideMenu(): void {
    this.displaySlideMenu = !this.displaySlideMenu;
  }

  /*Método que actualiza el nombre de la vista actual*/
  public setCurrentViewName(viewName: string): void {
    this.currentViewName = viewName;
  }

  /*Método clic de las opciones del navegador para el usuario*/
  public navigateTo(vista: string): void {
    // Si el menú abierto entonces hay que cerrarlo
    if (this.displaySlideMenu) {
      this.togleSlideMenu();
    }
    // Redirige a la vista que indique el parámetro
    this.router.navigate([vista]);
  }

  /*Convierte una imagen en Byte[] a algo que puede leer el navegador*/
  public convertArrayBytesToBase64(byte: any): string {
    var binary = '';
    var bytes = new Uint8Array(byte);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  public stringToDate(fechaString: string, format: string, isDateTime: boolean): Date {
    let resultado: Date = null;
    if ((fechaString == null) || (fechaString.length === 0)) {
      return resultado;
    }
    const Separador = (format === this.FormatoF_aammdd) ? '-' : '/';
    const dateTimeParted = fechaString.split(' ');
    const dateParted = ('' + dateTimeParted[0]).split(Separador);
    const timeParted = (isDateTime) ?
      ('' + dateTimeParted[1]).split(':') : ['0', '0', '0'];

    const dia = (format === this.FormatoF_aammdd) ?
      this.zeroPad(dateParted[2], 2) : this.zeroPad(dateParted[0], 2);
    const mes = this.zeroPad(dateParted[1], 2);
    const anio = (format === this.FormatoF_aammdd) ?
      this.zeroPad(dateParted[0], 4) : this.zeroPad(dateParted[2], 4);
    const hora = this.zeroPad(timeParted[0], 2);
    const min = this.zeroPad(timeParted[1], 2);
    const seg = this.zeroPad(timeParted[2], 2);

    resultado = new Date(
      parseInt(anio, 10),
      (parseInt(mes, 10) - 1),
      parseInt(dia, 10),
      parseInt(hora, 10), parseInt(min, 10), parseInt(seg, 10), 0
    );

    return resultado;
  }

  /*A partir de un objeto Date devuelve un string con formato aaaa-mm-dd H:m:s*/
  public dateToString(datetime: Date, isDateTime: boolean, format: string): string {
    let resultado = '';
    if (datetime == null) {
      return resultado;
    }

    const dia = this.zeroPad('' + datetime.getDate(), 2);
    const mes = this.zeroPad('' + (datetime.getMonth() + 1), 2);
    const anio = this.zeroPad('' + datetime.getFullYear(), 4);
    const hora = this.zeroPad('' + datetime.getHours(), 2);
    const min = this.zeroPad('' + datetime.getMinutes(), 2);
    const seg = this.zeroPad('' + datetime.getSeconds(), 2);

    resultado = (format === this.FormatoF_aammdd) ?
      anio + '-' + mes + '-' + dia : dia + '/' + mes + '/' + anio;
    if (isDateTime) {
      resultado = resultado + ' ' + hora + ':' + min + ':' + seg;
    }

    return resultado;
  }
  /*Añade ceros a la izquierda en la cadena de texto numero, según la cantidad de caracteres que indique el parámetro maxLength*/
  public zeroPad(numero: string, maxLength: number): string {
    let stringToReturn = '' + numero;
    while (stringToReturn.length < maxLength) {
      stringToReturn = '0' + stringToReturn;
    }
    return stringToReturn;
  }

  /*Devuelve el enlace base del servidor en donde se esté visualizando el sitio, pero para localhost se devuelve jbosscl1*/
  public getUrlServidor(): string {
    let url = location.protocol + '//' + location.host;
    if (url.indexOf('localhost') >= 0) {
      url = url.replace('http://localhost:4200', 'http://jbosscl1.lv.cfemex.com:9090');
    }

    return url;
  }

  /*Determina se la cadena que se le pasa como parámetro es un número o no.*/
  public esNumero(cadena: string): boolean {
    const numero = new RegExp('^[0-9]+([.][0-9]+)?$', 'i');
    return numero.test(cadena);
  }

  public redondearADos(num: number): number {
    return (Math.round(num * 100) / 100);
  }

  // Manda a imprimir lo que se encuentre en algún contenedor con la id printable, con todos los estilos del proyecto y de primeng
  public imprimir(): void {
    let printContents, popupWin;
    const allStyleSheets: string = this.getStringOfAllStylesheets();
    printContents = document.getElementById('printable').innerHTML;
    popupWin = window.open('', '', '');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
           ` + allStyleSheets + `
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
  /*Se utiliza para Importar las hojas de Estilo*/
  private getStringOfAllStylesheets(): string {
    let stylesheets = '';
    const sheets = document.styleSheets;
    const array = [];

    for (let c = 0; c < sheets.length; c++) {
      array.push(sheets[c].href);
    }
    for (let c = 0; c < sheets.length; c++) {
      if (sheets[c].href == null) {
        if ((sheets[c].ownerNode.firstChild != null) && (sheets[c].ownerNode.firstChild.textContent != null)) {
          stylesheets += '<style>' + sheets[c].ownerNode.firstChild.textContent + '</style>\n';
        }
      } else {
        stylesheets += '<link rel=\'stylesheet\' type=\'text/css\'  href=' + sheets[c].href + '/>\n';
      }
    }

    return stylesheets;
  }
}
