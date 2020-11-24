import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {DocumentosService} from '../Servicios/DocumentosService';
import {ConfirmationService, MessageService} from 'primeng/primeng';
import {Proyecto} from '../Clases/Proyecto';
import {PropiedadesOpcionales} from '../Clases/PropiedadesOpcionales';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-documentos-alfresco',
  templateUrl: './documentos-alfresco.component.html',
  styleUrls: ['./documentos-alfresco.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DocumentosAlfrescoComponent implements OnInit {
  /*Constantes*/
  private readonly ModeloCarpetaAlfresco = '{com.cfemex.lv.model}';
  private readonly TipoAlfresco = 'Documentos';
  readonly ColumnasDocumentos = [
    { field: 'title', header: 'Documento' },
    { field: 'description', header: 'Descripción' },
    { field: 'createdDate', header: 'Fecha de subida' }
  ];
  /*Tipos de mensajes p-growl*/
  private readonly Severidad_Succes = 'success';
  private readonly Severidad_Info = 'info';
  private readonly Severidad_Warn = 'warn';
  private readonly Severidad_Error = 'error';

  /*Inputs*/
  @Input() doctosRutaEstatica: string;
  @Input() doctosRutaDinamica: string;
  @Input() llaveCarpetaAlfresco: string;
  private _extensionesArchivoValidas: string[];
  @Input() subirDocumentos: boolean;
  @Input() tamanoMaximoMegabytes: number;
  @Input() nombreProyecto: string;
  @Input() usuarioAlfresco: string;
  @Input() unidadAlfresco: string;
  @Input() urlProyecto: string;
  @Input() subirMasDeUnArchivoALaVez: boolean;
  /*Variables*/
  tableLoader: boolean;
  listaDocs: Proyecto[];
  documentoSeleccionado: Proyecto;
  archivosParaSubir: FileList;
  private propiedadesOpcionales: PropiedadesOpcionales;
  private respuestaDelServlet: any;
  private cabeceraDelPOST: FormData;
  /*Popup de subir documento*/
  nuevoArchivoVerPopup: boolean;
  infoArchivosParaSubir: InfoArchivo[];
  fileAccepts: string;
  contadorArchivosSubidos: number;
  porcentajeBarra: number;
  mostrarPorcentajeBarra: boolean;

  constructor(private servicioDocumentos: DocumentosService, private confirmationService: ConfirmationService,
              private http: HttpClient, private messageService: MessageService) {
    this.listaDocs = [];
    this.doctosRutaEstatica = '';
    this.doctosRutaDinamica = '';
    this.llaveCarpetaAlfresco = '';
    this.propiedadesOpcionales = null;
    this.respuestaDelServlet = null;
    this.documentoSeleccionado = null;
    this.cabeceraDelPOST = null;
    this.nuevoArchivoVerPopup = false;
    this._extensionesArchivoValidas = [];
    this.subirDocumentos = false;
    this.tamanoMaximoMegabytes = 5;
    this.archivosParaSubir = null;
    this.infoArchivosParaSubir = [];
    this.tableLoader = false;
    this.nombreProyecto = '';
    this.usuarioAlfresco = '';
    this.unidadAlfresco = '1';
    this.urlProyecto = '';
    this.subirMasDeUnArchivoALaVez = false;
    this.fileAccepts = '';
    this.mostrarPorcentajeBarra = false;
    this.setPorcentajeDeLaBarra(false);
  }

  ngOnInit() {
    this.cargarDocumentos();
  }

  /*Pone el valor al contador de archivos subidos (aumenta en uno) y en base a eso se calcula el porcentaje de la barra.
  * Si el parámetro aumentar es falso entonces se inicializan ambos valores.*/
  private setPorcentajeDeLaBarra(aumentar: boolean): void {
    if (aumentar) {
      if (this.porcentajeBarra < 100) {
        this.contadorArchivosSubidos++;
        this.porcentajeBarra = (this.contadorArchivosSubidos / this.archivosParaSubir.length) * 100;
        if (this.porcentajeBarra >= 99) {
          const Mensaje = (this.archivosParaSubir.length > 1) ?
            'Fueron subidos ' + this.archivosParaSubir.length + ' documentos exitosamente.' :
            'Fue subido el documento exitosamente.';
          this.mostrarMensajeTemporal(this.Severidad_Succes, 'GUARDADO', Mensaje);
          this.cargarDocumentos();
        }
      }
    } else {
      this.porcentajeBarra = 0;
      this.contadorArchivosSubidos = 0;
    }
  }

  private cargarDocumentos() {
    this.listaDocs = [];
    this.tableLoader = true;
    setTimeout(() => {
      Promise.resolve(this.servicioDocumentos.seleccionarDocumentos(this.doctosRutaEstatica + this.doctosRutaDinamica,
      this.llaveCarpetaAlfresco))
      .then(doctos => {
        if (doctos != null) {
          this.listaDocs = doctos;
          const NumeroDoctos = this.listaDocs.length;
          // Convertir las fechas a tipo Date
          for (let i = 0; i < NumeroDoctos; i++) {
            this.listaDocs[i].createdDateTipoDate = this.stringToDateIndividual(this.listaDocs[i].createdDate + ' 00:00:00');
          }
        }
        this.tableLoader = false;
      });
    }, 100);
  }

  /*A partir de un datetime devuelve un objeto Date*/
  private stringToDateIndividual(datetime: string): Date {
    if ((typeof datetime === 'undefined') || (datetime == null) || (datetime.length === 0)) {
      return null;
    }
    const dateTimeParted = ('' + datetime).split(' ');
    const dateParted = (dateTimeParted[0]).split('/');
    const timeParted = ('' + dateTimeParted[1]).split(':');

    return new Date(
      parseInt(dateParted[2], 10),
      (parseInt(dateParted[1], 10) - 1),
      parseInt(dateParted[0], 10),
      parseInt(timeParted[0], 10),
      parseInt(timeParted[1], 10),
      parseInt(timeParted[2], 10),
      0
    );
  }

  /*A partir de un objeto Date devuelve un string con formato dd/mm/aaaa-mm-dd*/
  dateToString(datetime: Date): string {
    if (datetime == null) {
      return '';
    }

    const dia = this.zeroPad('' + datetime.getDate(), 2);
    const mes = this.zeroPad('' + (datetime.getMonth() + 1), 2);
    const anio = this.zeroPad('' + datetime.getFullYear(), 4);
    /*const hora = this.zeroPad('' + datetime.getHours(), 2);
    const min = this.zeroPad('' + datetime.getMinutes(), 2);
    const seg = this.zeroPad('' + datetime.getSeconds(), 2);*/

    // return anio + '-' + mes + '-' + dia + ' ' + hora + ':' + min + ':' + seg;
    return dia + '/' + mes + '/' + anio;
  }

  private zeroPad(numero: string, maxLength: number): String {
    let stringToReturn: String = '' + numero;
    while (stringToReturn.length < maxLength) {
      stringToReturn = '0' + stringToReturn;
    }
    return stringToReturn;
  }

  private validarConfiguracionesDeAlfresco(): boolean {
    // Validando rutas
    if ((this.doctosRutaEstatica.length === 0) && (this.doctosRutaDinamica.length === 0)) {
      this.mostrarMensajeTemporal(this.Severidad_Error, 'ERROR', 'Error en la configuración del módulo: ' +
        ' las direcciones de guardados están vacías.');
      return false;
    }
    // Validando que existan las extensiones
    if (this._extensionesArchivoValidas.length === 0) {
      this.mostrarMensajeTemporal(this.Severidad_Error, 'ERROR', 'Error en la configuración del módulo: ' +
        'No se definieron las extensiones válidas para los nuevos documentos.');
      return false;
    }
    // Validando que el peso máximo no sea tan grande o pequeño
    if ((this.tamanoMaximoMegabytes < 5) && (this.tamanoMaximoMegabytes > 100) ) {
      this.mostrarMensajeTemporal(this.Severidad_Error, 'ERROR', 'Error en la configuración del módulo: ' +
        'El tamaño máximo configurado ' + this.tamanoMaximoMegabytes + ' no es apropiado: rango permitido 5-100M.');
      return false;
    }

    return true;
  }

  validarArchivosParaSubir(listaArchivos: FileList): boolean {
    const numeroArchivos = listaArchivos.length;
    for (let ia = 0; ia < numeroArchivos; ia++) {
      // Validando el tamaño del archivo
      if (listaArchivos[ia].size > (this.tamanoMaximoMegabytes * 1024 * 1024)) {
        this.mostrarMensajeTemporal(this.Severidad_Error, 'ERROR', 'El tamaño del archivo excede el limite de ' +
          this.tamanoMaximoMegabytes + 'MB, verifique y vuelva a intentarlo.');
        return false;
      }
      // Si el título del archivo contiene caracteres especiales
      if (this.tieneCaracteresEspeciales(listaArchivos[ia].name)) {
        this.mostrarMensajeTemporal(this.Severidad_Error, 'ERROR', 'El nombre del archivo no puede contener caracteres especiales');
        return false;
      }
      // Validar el tipo de archivo
      const lastFive = listaArchivos[ia].name.substr(listaArchivos[ia].name.length - 5);
      const nombreDoctoSeparated = lastFive.split('.');
      if ((nombreDoctoSeparated == null) ||
        ( (nombreDoctoSeparated.length > 0) &&
          (this._extensionesArchivoValidas.indexOf(nombreDoctoSeparated[1].trim().toUpperCase()) < 0) )
      ) {
        this.mostrarMensajeTemporal(this.Severidad_Error, 'ERROR', 'El tipo de archivo no es válido.');
        return false;
      }
      // Validar si el archivo ya se subió
      const NumeroDoctosGuardados = this.listaDocs.length;
      let encontrado = '';
      for ( let j = 0; j < NumeroDoctosGuardados; j++) {
        if (this.listaDocs[j].name.trim().toUpperCase() === listaArchivos[ia].name.trim().toUpperCase()) {
          encontrado = this.listaDocs[j].title;
          j = NumeroDoctosGuardados;
        }
      }
      if (encontrado.length > 0) {
        this.mostrarMensajeTemporal(this.Severidad_Error, 'ERROR', 'El archivo ya existe en la lista, es el que se tituló: ' +
          encontrado);
        return false;
      }
    }

    return true;
  }

  private tieneCaracteresEspeciales(cadena: string): boolean {
    let resultado: boolean;
    let i: number;
    let code: number;
    for (i = 0; i < cadena.length; i++) {
      code = cadena.toUpperCase().charCodeAt(i);
      if ((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || code === 95 || code === 45 || code === 46 || code === 32) {
        resultado = false;
      } else {
        resultado = true;
        break;
      }
    }
    return resultado;
  }

  private enviarArchivo() {
    this.tableLoader = true;
    const NumeroArchivos = this.archivosParaSubir.length;
    this.respuestaDelServlet = null;
    this.setPorcentajeDeLaBarra(false);
    this.mostrarPorcentajeBarra = true;
    for (let i = 0; i < NumeroArchivos; i++) {
      setTimeout(() => {
        const infoDeArchivo = this.getInfoArchivo(i);
        this.cabeceraDelPOST = new FormData();
        this.cabeceraDelPOST.append('uploadFile', this.archivosParaSubir[i], this.archivosParaSubir[i].name);
        this.cabeceraDelPOST.append('statico', this.doctosRutaEstatica);
        this.cabeceraDelPOST.append('llave', this.llaveCarpetaAlfresco);
        this.cabeceraDelPOST.append('esc', '');
        this.cabeceraDelPOST.append('accion', 'Insertar');
        this.cabeceraDelPOST.append('name', this.archivosParaSubir[i].name.toUpperCase());
        this.cabeceraDelPOST.append('tipoAlfresco', this.TipoAlfresco);
        this.cabeceraDelPOST.append('unidad', 'Unidad ' + this.unidadAlfresco);
        this.cabeceraDelPOST.append('usuario', this.usuarioAlfresco);
        this.cabeceraDelPOST.append('urlProy', this.urlProyecto);
        this.cabeceraDelPOST.append('proyecto', this.nombreProyecto);
        this.cabeceraDelPOST.append('esc2', '');
        this.cabeceraDelPOST.append('modelo', this.ModeloCarpetaAlfresco);
        this.cabeceraDelPOST.append('dinamico', this.doctosRutaDinamica);
        this.cabeceraDelPOST.append('title', infoDeArchivo.nombreArchivo.trim().toUpperCase());
        this.cabeceraDelPOST.append('description', infoDeArchivo.descripcion.trim().toUpperCase());
        this.cabeceraDelPOST.append('mimetype', this.obtenerMimetype(this.archivosParaSubir[i].name));
        this.cabeceraDelPOST.append('observe', 'response');
        this.http.post('http://gcnti.lv.cfemex.com/weborb/SubeAlfresco', this.cabeceraDelPOST)
          .subscribe(
            res => {
              /*console.log('res = ');
              console.log(res);*/
              // this.respuestaDelServlet = res;
              // this.enviarArchivoResultado(res);
            },
            err => {
              // console.log('Error occured', err);
              // console.log('Error occured, statusText = ', err.statusText);
              this.enviarArchivoResultado(err.statusText, infoDeArchivo.nombreArchivo.trim().toUpperCase());
            }
          );
        /*this.http.post<ObjetoRespuesta>('http://gcnti.lv.cfemex.com/weborb/SubeAlfresco', this.cabeceraDelPOST).subscribe(res => {
          console.log(res); // OK, data is an instance of ItemsResponse
        });*/
      }, 100);
    }
  }

  private getInfoArchivo(indiceFileList: number): InfoArchivo {
    for (const info of this.infoArchivosParaSubir) {
      if (info.nombreArchivo === this.archivosParaSubir[indiceFileList].name) {
        return info;
      }
    }

    return null;
  }

  enviarArchivoResultado(statusText: string, tituloArchivo: string) {
    this.tableLoader = false;
    /*if (this.respuestaDelServlet == null || (this.respuestaDelServlet._body != null &&
      this.respuestaDelServlet._body !== undefined && this.respuestaDelServlet._body.length > 0) ) {*/
    if (statusText === 'OK') {
      this.setPorcentajeDeLaBarra(true);
      // this.mostrarMensajeTemporal(this.Severidad_Succes, 'GUARDADO', 'Documento guardado correctamente');
    } else {
      this.mostrarMensajeTemporal(this.Severidad_Error, 'ERROR', 'Error al intentar subir el documento ' + tituloArchivo);
    }
  }

  click_btnEliminar() {
    // if ((this.documentoSeleccionado !== undefined) && (this.documentoSeleccionado != null) && !(this.documentoSeleccionado._$visited)) {
    if ((this.documentoSeleccionado !== undefined) && (this.documentoSeleccionado != null)) {
      this.confirmationService.confirm({
        message: '¿Está seguro que desea eliminar este archivo?',
        key: 'doctosConfirm',
        accept: () => {
          this.eliminarArchivo();
        }
      });
    } else {
      this.mostrarMensajeTemporal(this.Severidad_Info, 'INFORMATIVO', 'Debe seleccionar un archivo para eliminarlo');
    }
  }


  eliminarArchivo() {
    try {
      this.tableLoader = true;
      setTimeout(() => {
        Promise.resolve(this.servicioDocumentos.eliminarDocumento(this.documentoSeleccionado.id))
          .then(res => {
            this.tableLoader = false;
            this.documentoSeleccionado = null;
            this.cargarDocumentos();
            this.mostrarMensajeTemporal(this.Severidad_Succes, 'ELIMINADO', 'El archivo fue eliminado exitosamente');
          });
      }, 100);
    } catch (error) {
      console.error(error);
    }
  }

  private mostrarMensajesTemporales(mensajes: ToastMensaje[]) {
    this.messageService.addAll(mensajes);
  }

  private mostrarMensajeTemporal(severidad: string, titulo: string, mensaje: string): void {
    this.messageService.add({severity: severidad, summary: titulo, detail: mensaje});
  }

  ponerIconoTipoDocto(nombreDocto: string): string {
    let imageResourceUrl = 'src/assets/';
    const lastFive = nombreDocto.substr(nombreDocto.length - 5);
    const nombreDoctoSeparated = lastFive.split('.');
    const IconoWord = 'doc_48.png';
    const IconoExcel = 'excel_48.png';
    const IconoPPoint = 'ppt_48.png';
    const IconoPDF = 'pdf_48.png';
    const IconoMedia = 'avi_48.png';
    const IconoImagen = 'picture.png';
    const IconoTexto = 'txt_48.png';
    const IconoDesconocido = 'unkown_48.png';

    if (nombreDoctoSeparated != null && nombreDoctoSeparated.length > 0) {
      switch (nombreDoctoSeparated[1].toLowerCase()) {
        case 'doc':
          imageResourceUrl = imageResourceUrl + IconoWord;
          break;
        case 'docx':
          imageResourceUrl = imageResourceUrl + IconoWord;
          break;
        case 'xls':
          imageResourceUrl = imageResourceUrl + IconoExcel;
          break;
        case 'xlsx':
          imageResourceUrl = imageResourceUrl + IconoExcel;
          break;
        case 'ppt':
          imageResourceUrl = imageResourceUrl + IconoPPoint;
          break;
        case 'pptx':
          imageResourceUrl = imageResourceUrl + IconoPPoint;
          break;
        case 'pdf':
          imageResourceUrl = imageResourceUrl + IconoPDF;
          break;
        case 'mp4':
          imageResourceUrl = imageResourceUrl + IconoMedia;
          break;
        case 'mkv':
          imageResourceUrl = imageResourceUrl + IconoMedia;
          break;
        case 'wmv':
          imageResourceUrl = imageResourceUrl + IconoMedia;
          break;
        case 'avi':
          imageResourceUrl = imageResourceUrl + IconoMedia;
          break;
        case 'mov':
          imageResourceUrl = imageResourceUrl + IconoMedia;
          break;
        case 'wma':
          imageResourceUrl = imageResourceUrl + IconoMedia;
          break;
        case 'jpeg':
          imageResourceUrl = imageResourceUrl + IconoImagen;
          break;
        case 'jpg':
          imageResourceUrl = imageResourceUrl + IconoImagen;
          break;
        case 'png':
          imageResourceUrl = imageResourceUrl + IconoImagen;
          break;
        case 'txt':
          imageResourceUrl = imageResourceUrl + IconoTexto;
          break;
        default:
          imageResourceUrl = imageResourceUrl + IconoDesconocido;
          break;
      }
    } else {
      imageResourceUrl = imageResourceUrl + IconoDesconocido;
    }

    return imageResourceUrl;
  }

  private obtenerMimetype(nombreArchivo: string): string {
    let mimetype: string;
    const lastFive = nombreArchivo.trim().substr(nombreArchivo.length - 5);
    const nombreDoctoSeparated = lastFive.split('.');
    if (nombreDoctoSeparated != null && nombreDoctoSeparated.length > 0) {
      switch (nombreDoctoSeparated[1].toLowerCase()) {
        case 'doc':
          mimetype = 'application/msword';
          break;
        case 'docx':
          mimetype = 'application/msword';
          break;
        case 'xls':
          mimetype = 'application/excel';
          break;
        case 'xlsx':
          mimetype = 'application/excel';
          break;
        case 'ppt':
          mimetype = 'application/mspowerpoint';
          break;
        case 'pptx':
          mimetype = 'application/mspowerpoint';
          break;
        case 'pdf':
          mimetype = 'application/pdf';
          break;
        case 'mp4':
          mimetype = 'video/mp4';
          break;
        case 'mkv':
          mimetype = 'video/x-matroska';
          break;
        case 'wmv':
          mimetype = 'ideo/x-ms-wmv';
          break;
        case 'avi':
          mimetype = 'video/avi';
          break;
        case 'mov':
          mimetype = 'video/quicktime';
          break;
        case 'jpeg':
          mimetype = 'image/jpeg';
          break;
        case 'jpg':
          mimetype = 'image/jpeg';
          break;
        case 'png':
          mimetype = 'image/png';
          break;
        case 'gif':
          mimetype = 'image/gif';
          break;
        case 'vsd':
          mimetype = 'application/x-visio';
          break;
        case 'ico':
          mimetype = 'image/x-icon';
          break;
        case 'rar':
          mimetype = 'application/x-rar-compressed';
          break;
        case 'zip':
          mimetype = 'application/x-compressed';
          break;
        default:
          mimetype = 'text/plain';
          break;
      }
    } else {
      mimetype = 'text/plain';
    }

    return mimetype;
  }

  private obtenerFileAccept(): string {
    let accepts = '';
    if (this._extensionesArchivoValidas.length > 0) {
      for (const extesion of this._extensionesArchivoValidas) {
        if (accepts.indexOf(extesion.toLowerCase()) < 0) {
          if (accepts.length > 0) {
            accepts += ',';
          }
          accepts += '.' + extesion.toLowerCase();
        }
      }
    }

    return accepts;
  }


  /*--- EVENTOS ---*/
  click_btnVer() {
    if (this.documentoSeleccionado !== undefined && this.documentoSeleccionado != null) {
      Promise.resolve(this.servicioDocumentos.mostrarArchivo(this.documentoSeleccionado.id)).then(resultado => {
        const win = window.open(resultado, '_blank');
        win.focus();
      });
    } else {
      this.mostrarMensajeTemporal(this.Severidad_Info, 'INFORMATIVO', 'Debe seleccionar un archivo para visualizarlo');
    }
  }

  private descargarDocto(url: string): void {
    this.http.get(url,
      {responseType: 'blob'})
      .toPromise()
      .then(
        data => {
          const LastFive = this.documentoSeleccionado.name.toLowerCase().substr(this.documentoSeleccionado.name.length - 5);
          const TipoMIMEArchivo = (LastFive.indexOf('pdf') >= 0) ? 'file/pdf' : 'application/msword';
          const blob = new Blob([data], {type: TipoMIMEArchivo});
          const Url = window.URL.createObjectURL(blob);
          // noinspection TsLint
          let a = document.createElement('a');
          document.body.appendChild(a);
          a.href = Url;
          a.download = this.documentoSeleccionado.name;
          a.click();
          window.URL.revokeObjectURL(Url);
        });
  }

  seleccionadoArchivoParaSubir(event) {
    this.archivosParaSubir = null;
    const ListaDeArchivos = event.files;
    const NumeroArchivos = ListaDeArchivos.length;

    if (NumeroArchivos > 0) {
      // Antes de intentar subir se tienen que validar las configuraciones de alfresco y si los archivos cumplen con las condiciones
      if (this.validarConfiguracionesDeAlfresco() && this.validarArchivosParaSubir(ListaDeArchivos)) {
        this.archivosParaSubir = ListaDeArchivos;
        this.agregarInfoArchivos();
        this.nuevoArchivoVerPopup = true; // muestra el formulario de nuevoArchivoTitulo y descripción
      }
    }
  }
  agregarInfoArchivos(): void {
    this.infoArchivosParaSubir = [];
    const NumArchivos = this.archivosParaSubir.length;
    for (let i = 0; i < NumArchivos; i++) {
      const lastFive = this.archivosParaSubir[i].name.substr(this.archivosParaSubir[i].name.length - 5);
      const nombreDoctoSeparated = lastFive.split('.');
      const NombreSinExtension = this.archivosParaSubir[i].name.replace('.' + nombreDoctoSeparated[1], '');
      this.infoArchivosParaSubir.push({
        nombreArchivo: this.archivosParaSubir[i].name,
        titulo: NombreSinExtension,
        descripcion: NombreSinExtension
      });
    }
  }

  subirArchivoCancelar() {
    this.nuevoArchivoVerPopup = false;
  }

  subirArchivoAceptar() {
    if (this.validarInfoArchivos()) {
      this.enviarArchivo();
      this.nuevoArchivoVerPopup = false;
    } else {
      this.mostrarMensajeTemporal(this.Severidad_Warn, 'Falta', 'Se deben de llenar los campos para subir el archivo');
    }
  }
  private validarInfoArchivos(): boolean {
    for (const info of this.infoArchivosParaSubir) {
      if (info.titulo.trim().length === 0) {
        return false;
      }
      if (info.descripcion.trim().length === 0) {
        return false;
      }
    }

    return true;
  }


  /*--- GETTERs y SETTERs*/
  @Input()
  get extensionesArchivoValidas(): string[] {
    return this._extensionesArchivoValidas;
  }
  set extensionesArchivoValidas(value: string[]) {
    const NumValues = value.length;
    if (value != null && NumValues > 0) {
      for (let i = 0; i < NumValues; i++) {
        value[i] = value[i].trim().toUpperCase();
      }
    }
    this._extensionesArchivoValidas = value;
    this.fileAccepts = this.obtenerFileAccept();
  }
}
export class ToastMensaje {
  severity: string;
  summary: string;
  detail: string;

  constructor(severidad: string, titulo: string, mensaje: string) {
    this.severity = severidad;
    this.summary = titulo;
    this.detail = mensaje;
  }
}
export interface InfoArchivo {
  nombreArchivo: string;
  titulo: string;
  descripcion: string;
}

export interface ObjetoRespuesta {
  status: number;
  statusText: string;
}
