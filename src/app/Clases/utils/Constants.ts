import { environment } from 'src/environments/environment';
/**
 * Creado por VEG el 25/10/2017.
 * Esta clase contiene todas las constantes utilizadas por este sistema
 */
export class Constants {
  public static readonly RutaImgs: string = "assets/";
  public static readonly ErrorGeneral: string =
    "Ha ocurrido un error del sistema, favor de llamar a informática (ext. 4223).";

  /*Nombre de rutas para las vistas*/

  /*Tipos de mensajes p-growl*/
  public static readonly Pgrowl_Succes: string = "success";
  public static readonly Pgrowl_Info: string = "info";
  public static readonly Pgrowl_Warn: string = "warn";
  public static readonly Pgrowl_Error: string = "error";


  //Vistas
  public static readonly VistaInicio = 'home';
  public static readonly VistaDetalle = 'detalle';
  public static readonly VistaAcceso = 'login';
  public static readonly VistaUsuarios = 'usuarios';

  public static readonly CalendarioEspa = {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre',
      'Noviembre', 'Diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Borrar'
  };


  /*Variables del Localstorage*/
  public static readonly InformacionUsuario = environment.nombreProyecto+'InformacionUsuario';
}
