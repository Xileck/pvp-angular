import { ActividadPenetracion } from './../../Clases/BEANs/ActividadPenetracion';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from './../../Clases/utils/Constants';
import { global } from './../../Clases/utils/global';
import { MensajesService } from './../../servicios/mensajes.service';
import { Combo_general } from '../../Clases/BEANs/Combo_general';
import { SelectItem, TreeNode } from 'primeng/api';
import { InformacionGeneralService } from '../../servicios/informacion-general.service';
import { PvpService } from 'src/app/servicios/pvp.service';
import { MessageService, TreeTable } from 'primeng';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {


  location = location;
  cols: any[];
  frozenCols: any[];
  selectedColumns: any[];

  filtroGlobal: string = '';


  CalendarioEspa = Constants.CalendarioEspa;
  actividad: any;
  displayDialogoID = false;
  idInsertado: number;
  tiempoMayor: number[] = [];

  //Arreglo de Unidad
  unidadSeleccionado: number;
  readonly UnidadOptions = [
    { label: 'Seleccione la Unidad', value: null },
    { label: '1', value: 1 },
    { label: '2', value: 2 }
  ];
  //Arreglo de divisiones
  divisionSeleccionado: string;
  readonly DivisionOptions = [
    { label: 'Seleccionar', value: '' },
    { label: 'N/A', value: 'N/A' },
    { label: 'I', value: '1' },
    { label: 'II', value: '2' },
    { label: 'III', value: '3' }
  ];

  //Arreglo Avances
  avanseSeleccionado: string;
  readonly AvanceOptions = [
    { label: 'Seleccione el Avance', value: '' },
    { label: '0%', value: '0' },
    { label: '90%', value: '90' },
    { label: 'Menores a 90%', value: '<90' },
    { label: 'ACTIVIDAD TERMINADA 100%', value: '100' }
  ];

  //Arreglo Grupos de Trabajo
  grupoTrabajoSeleccionado: string;
  arregloGruposTrabajo: Combo_general[];
  arrGrupoTrabajo: SelectItem[];



  //arreglos para desplegar y seleccionar los sistemas
  arregloSistemas: Combo_general[];
  arrSistemas: SelectItem[];
  sistemaSeleccionado: string;
  sistemaConsecutivoSeleccionado: string;

  // arreglos para desplegar y seleccionar los componentes
  arregloComponentes: Combo_general[];
  arrComponente: SelectItem[];
  componenteSeleccionado: string;

  //Fechas
  fechaInicio: Date;
  fechaTermino: Date;

  //Inop
  inopSeleccionada: string;

  //RCI
  rciSeleccionada: string;

  //PASGO-04
  pasgoSeleccionado: string;

  //Libranzas
  libranzaSeleccionado: string;

  //Consecutivo
  consecutivoSeleccionado: string;

  //Orden de trabajo
  ordenSeleccionado: string;

  //Prueba de fugas
  pruebaFugasSeleccionado: string;

  //Tag
  tagSeleccionado: string;
  condicionTag: string[];
  arreglotags: Combo_general[];
  arrTags: SelectItem[];

  //Elevacion, edificio, cuarto
  elevacionSeleccionado: string;
  cuartoSeleccionado: string;
  edificioSeleccionado: string;

  //Penetracion
  penetracionSeleccionado: string;

  //Descripcion de la actividad
  descripcionActividadSeleccionado: string;

  //Resultados de consulta
  arregloResultadoConsulta: TreeNode[];

  totalRegistros: number = 0;
  totalRegistrosRelacionados: number = 0;

  buscando: boolean;



  constructor(public mensajeService: MensajesService,
    private servicioInformacionGeneral: InformacionGeneralService, private router: Router,
    public servicioPVP: PvpService, private messageService: MessageService) {
    this.inicializarCampos();
  }

  async ngOnInit() {
    this.seleccionarGpoTrabajo();
    await this.servicioPVP.obtenerDatosRecarga()


    if (this.servicioPVP.unidadRecarga == 1) {
      this.unidadSeleccionado = this.UnidadOptions[1].value;
      this.despliegaSistemas()
    }
    else if (this.servicioPVP.unidadRecarga == 2) {
      this.unidadSeleccionado = this.UnidadOptions[2].value;
      this.despliegaSistemas()
    }
    else
      this.unidadSeleccionado = this.UnidadOptions[0].value;

    this.buscar()

    this.cols = [
      { field: 'iDActividad', header: 'ID Actividad', width: '130' },
      { field: 'ordenTrabajo', header: 'Orden Trabajo', width: '90' },
      { field: 'ubicacionTecnica', header: 'Ubicación Técnica', width: '130' },
      { field: 'descripcionActividad', header: 'Descripción Actividad', width: '200' },
      { field: 'grupoTrabajo', header: 'Grupo Trabajo', width: '150' },
      { field: 'ingResponsable', header: 'Ing. Responsable', width: '85' },
      { field: 'fechaPlanInicio', header: 'Fecha Inicio(dia/mes/año)', width: '150' },
      { field: 'fechaPlanFin', header: 'Fecha Fin(dia/mes/año)', width: '150' },
      { field: 'duracionOriginal', header: 'Duración Original', width: '62' }
    ];

    this.frozenCols = [
      { field: 'iDActividad', header: 'ID Actividad', width: '130' }
    ];
  }


  inicializarCampos() {
    this.unidadSeleccionado = 0;
    this.divisionSeleccionado = '';
    this.avanseSeleccionado = '';
    // sistemas
    this.arregloSistemas = [];
    this.arrSistemas = [];
    this.arrSistemas.push({ label: '- S/Sistema -', value: null });
    this.sistemaSeleccionado = '';
    this.sistemaConsecutivoSeleccionado = '';
    this.arregloGruposTrabajo = [];
    this.arrGrupoTrabajo = [];
    this.arrGrupoTrabajo.push({ label: 'Grupo Trabajo', value: null });
    // this.fechaInicio = new Date();
    // this.fechaTermino = new Date();
    this.inopSeleccionada = '';
    this.rciSeleccionada = '';
    this.pasgoSeleccionado = '';
    this.libranzaSeleccionado = '';
    this.componenteSeleccionado = '';
    this.ordenSeleccionado = '';
    this.pruebaFugasSeleccionado = '';
    this.tagSeleccionado = '';
    this.edificioSeleccionado = '';
    this.elevacionSeleccionado = '';
    this.cuartoSeleccionado = '';
    this.descripcionActividadSeleccionado = '';
    this.penetracionSeleccionado = '';
    this.arregloResultadoConsulta = [];
    this.condicionTag = [];
  }

  validarCampos(): boolean {

    if (this.unidadSeleccionado == null || this.unidadSeleccionado == null) {
      this.mensajeService.showTempMessage(Constants.Pgrowl_Warn, 'Error', 'Seleccione la Unidad');
      return false;
    }
    if (this.tagSeleccionado == null || this.tagSeleccionado.trim().length == 0) {
      this.mensajeService.showTempMessage(Constants.Pgrowl_Warn, 'Error', 'Ingresa el TAG (Ubicación Técnica)');
      return false;
    }

    return true;
  }

  /*Evento que se activa cuando el usuario presiona alguna tecla dentro del input*/
  async enterKeyPressed(event: any, texto: string) {
    // Checar si se presionó la tecla ENTER
    const LongitudTexto = texto.trim().length;
    if ((LongitudTexto > 0) && ((event.code === 'Enter') || (event.code === 'NumpadEnter'))) {
      this.buscarInfoOT(texto)
    }
    if ((LongitudTexto === 7 || LongitudTexto === 9 || LongitudTexto === 12) && (texto.search('[0-9]') >= 0)) {
      this.buscarInfoOT(texto)
    }
  }

  async buscarInfoOT(ot: any) {
    let resultOT = await this.servicioPVP.seleccionarOrdenTrabajo(ot);
    this.despliegaSistemas();

    if (resultOT != null && resultOT.numero != null && resultOT.numero.trim().length > 0) {
      this.mensajeService.showTempMessage(Constants.Pgrowl_Info, 'Info', 'Se encontró información de la OT ingresada.');

      if (resultOT.cuarto != null && resultOT.cuarto.trim().length > 0 && resultOT.cuarto.trim() != 'N/A')
        this.cuartoSeleccionado = resultOT.cuarto

      if (resultOT.azimuth != null && resultOT.azimuth.trim().length > 0 && resultOT.azimuth.trim() != 'N/A')
        this.elevacionSeleccionado = resultOT.azimuth

      if (resultOT.ubicacion != null && resultOT.ubicacion.trim().length > 0) {
        this.tagSeleccionado = resultOT.ubicacion

        let ubicacion = await this.servicioPVP.seleccionarUbicacionTecnica(this.tagSeleccionado)


        if (ubicacion.cuarto != null && ubicacion.cuarto.trim().length > 0)
          this.cuartoSeleccionado = ubicacion.cuarto

        if (ubicacion.localizacion != null && ubicacion.localizacion.trim().length > 0)
          this.edificioSeleccionado = ubicacion.localizacion

        if (ubicacion.azimuth != null && ubicacion.azimuth.trim().length > 0)
          this.elevacionSeleccionado = ubicacion.azimuth

        if (ubicacion.claveSistema != null && ubicacion.claveSistema.trim().length > 0) {
          this.sistemaSeleccionado = ubicacion.claveSistema;
          this.despliegaComponente(this.unidadSeleccionado, this.sistemaSeleccionado);
        }

        if (ubicacion.claveComponente != null && ubicacion.claveComponente.trim().length > 0)
          this.componenteSeleccionado = ubicacion.claveComponente;

        if (ubicacion.consecutivo != null && ubicacion.consecutivo.trim().length > 0)
          this.consecutivoSeleccionado = ubicacion.consecutivo;

      }

      this.unidadSeleccionado = resultOT.unidad;
      this.divisionSeleccionado = resultOT.division;
    }
  }

  /**Para limpiar campos */
  refrescarPagina() {
    /**Para refrescar componente */
    this.router.navigateByUrl('/usuarios', { skipLocationChange: true }).then(() => {
      this.router.navigate(['home']);
    });
  }

  public async despliegaSistemas() {
    console.log(this.unidadSeleccionado)
    global.getInstance().wait(100);
    if (this.unidadSeleccionado != null && this.unidadSeleccionado != null) {
      let resultado = await this.servicioInformacionGeneral.seleccionarSistemas(this.unidadSeleccionado);



      this.arregloSistemas = resultado;

      this.arrSistemas = [];
      this.arrSistemas.push({ label: 'Sistema', value: null });
      for (const entry of this.arregloSistemas) {
        this.arrSistemas.push({ label: entry.clave.trim(), value: entry.clave.trim() });
      }
    }

    else {
      this.arrSistemas = [];
      this.sistemaSeleccionado = '';
      this.sistemaConsecutivoSeleccionado = '';
      this.arrSistemas.push({ label: 'S/Sistema', value: null });
    }
  }

  public despliegaComponente(unidad: number, sistema: string) {
    setTimeout(() => {
      Promise.resolve(this.servicioInformacionGeneral.seleccionarComponentes(unidad, sistema)).then(resultado => {
        this.arregloComponentes = resultado;
        this.arrComponente = [];
        this.arrComponente.push({ label: 'Componente', value: null });
        for (const entry of this.arregloComponentes) {
          this.arrComponente.push({ label: entry.clave.trim(), value: entry.clave.trim() })
        }
      }).catch(function (e) {
        this.servicioMensajes.showTempMessage('warn', 'ALERTA', 'Error al obtener la lista de Componentes');
      });
    }, 100);
  }

  showSuccess(msg: string) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: msg });
  }

  public seleccionarGpoTrabajo() {
    setTimeout(() => {
      Promise.resolve(this.servicioPVP.seleccionarGpoTrabajo()).then(resultado => {

        this.arregloGruposTrabajo = resultado;
        this.arrGrupoTrabajo = [];
        this.arrGrupoTrabajo.push({ label: 'Grupo Trabajo', value: null });
        for (const entry of this.arregloGruposTrabajo) {
          this.arrGrupoTrabajo.push({ label: entry.descripcion.trim(), value: entry.clave.trim() })
        }
      }).catch(function (e) {
        this.servicioMensajes.showTempMessage('warn', 'ALERTA', 'Error al obtener la lista de Grupos de Trabajo');
      });
    }, 100);
  }

  public consultaUbicacionCondicion() {
    setTimeout(() => {
      this.condicionTag.push(" ubicacion LIKE '%" + this.tagSeleccionado + "%' ");
      Promise.resolve(this.servicioPVP.seleccionarUbicacionTecnicaCondicion(this.condicionTag)).then(resultado => {

        this.arreglotags = resultado;
        this.arrTags = [];
        this.arrTags.push({ label: 'Ubicación Técnica', value: null });
        for (const entry of this.arreglotags) {
          this.arrTags.push({ label: entry.descripcion.trim(), value: entry.clave.trim() })
        }
      }).catch(function (e) {
        this.servicioMensajes.showTempMessage('warn', 'ALERTA', 'Error al obtener la lista de Grupos de Trabajo');
      });
    }, 100);
  }

  public limpiaFiltros() {
    this.consecutivoSeleccionado = '';
    this.ordenSeleccionado = '';
    this.pruebaFugasSeleccionado = '';
    this.inopSeleccionada = '';
    this.rciSeleccionada = '';
    this.libranzaSeleccionado = '';
    this.pasgoSeleccionado = '';
    this.tagSeleccionado = '';
    this.cuartoSeleccionado = '';
    this.edificioSeleccionado = '';
    this.elevacionSeleccionado = '';
    this.penetracionSeleccionado = '';
    this.descripcionActividadSeleccionado = '';
    this.unidadSeleccionado = null;
    this.divisionSeleccionado = '';
    this.fechaInicio = null;
    this.fechaTermino = null;
    this.sistemaSeleccionado = '';
    this.componenteSeleccionado = '';
    this.grupoTrabajoSeleccionado = '';
    this.avanseSeleccionado = '';
    //this.arregloResultadoConsulta = [];
  }

  public construyeCondicion() {
    let condicion: string[] = [];

    condicion.push(' unidad=\'' + this.unidadSeleccionado + '\'');
    if (this.ordenSeleccionado != '')
      condicion.push(' numorden=\'' + this.ordenSeleccionado + '\'');
    if (this.sistemaSeleccionado != null && this.sistemaSeleccionado != '')
      condicion.push(' cvesistema =\'' + this.sistemaSeleccionado + '\'');
    if (this.componenteSeleccionado != null && this.componenteSeleccionado != '')
      condicion.push(' cvecomp =\'' + this.componenteSeleccionado + '\'');
    if (this.consecutivoSeleccionado != null && this.consecutivoSeleccionado != '')
      condicion.push(' consecutivo = \'' + this.consecutivoSeleccionado + '\'');
    if (this.divisionSeleccionado != null && this.divisionSeleccionado != '')
      condicion.push(' division = \'' + this.divisionSeleccionado + '\'');
    if (this.tagSeleccionado != null && this.tagSeleccionado != '')
      condicion.push(' ubicacion =\'' + this.tagSeleccionado + '\'');
    if (this.cuartoSeleccionado != null && this.cuartoSeleccionado != '')
      condicion.push(' cuarto = \'' + this.cuartoSeleccionado + '\'');
    if (this.elevacionSeleccionado != null && this.elevacionSeleccionado != '')
      condicion.push(' cveniv = \'' + this.elevacionSeleccionado + '\'');
    if (this.edificioSeleccionado != null && this.edificioSeleccionado != '')
      condicion.push(' cveedif =\'' + this.edificioSeleccionado + '\'');
    if (this.penetracionSeleccionado != null && this.penetracionSeleccionado != '') //r3activ
      condicion.push('  descactiv LIKE \'%' + this.penetracionSeleccionado + '%\'');
  }



  async buscar(table?: TreeTable) {

    // Reseteamos la tabla para que el paginador regrese a la pagina 1.
    if (table != null) {
      table.reset()
      this.filtroGlobal = ''
    }

    this.buscando = true;
    await global.getInstance().wait(100)
    let condiciones: string[] = [];
    this.totalRegistros = 0;
    this.totalRegistrosRelacionados = 0;

    if (this.campoValido(this.ordenSeleccionado))
      condiciones.push('a.numorden = \'' + this.ordenSeleccionado + '\'')

    if (this.campoValido(this.unidadSeleccionado))
      condiciones.push('a.unsist = ' + this.unidadSeleccionado)

    if (this.campoValido(this.sistemaSeleccionado))
      condiciones.push('a.sist = \'' + this.sistemaSeleccionado + '\'')

    if (this.campoValido(this.componenteSeleccionado))
      condiciones.push('tag_activ.cvecomp = \'' + this.componenteSeleccionado + '\'')

    if (this.campoValido(this.consecutivoSeleccionado))
      condiciones.push('tag_activ.consectag = \'' + this.consecutivoSeleccionado + '\'')

    if (this.campoValido(this.divisionSeleccionado))
      condiciones.push('a.div = \'' + this.divisionSeleccionado + '\'')

    if (this.campoValido(this.descripcionActividadSeleccionado))
      condiciones.push('UPPER(a.descactiv) LIKE(\'%' + this.descripcionActividadSeleccionado + '%\')')

    console.log(condiciones)

    let resultAct = await this.servicioPVP.seleccionarActividadPenetracionCondicion(condiciones);

    this.arregloResultadoConsulta = this.convertirATreeNode(resultAct, false);

    this.showSuccess('Se encontraron: ' + this.totalRegistros + ' penetraciones, y ' + this.totalRegistrosRelacionados + ' relacionadas.')
    this.buscando = false;
  }

  campoValido(campo: any): boolean {
    if (campo == null)
      return false;
    if (typeof campo === "string")
      return (campo.trim().length > 0)
    if (typeof campo === "number")
      return true;
  }

  // Recibe numero de dias y lo convierte a horas o dias dependiendo el valor.
  // Ejemplo: .17 dias serian 4 horas
  formatearDuracion(date1: Date, date2: Date): string {

    if (date2 == null || date1 == null)
      return ''

    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();

    if (isNaN(Difference_In_Time) || Difference_In_Time == 0)
      return ''

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);


    let duracion: any = Math.abs(Difference_In_Days)



    if (duracion < 1) {
      duracion = duracion * 24
      if (!Number.isInteger(duracion))
        duracion = duracion.toFixed(1)
      duracion = duracion + " hora" + ((duracion) > 1 ? 's' : '');
    }
    else {
      if (!Number.isInteger(duracion))
        duracion = duracion.toFixed(1)
      duracion = 2 + " dia" + (duracion > 1 ? 's' : '');
    }

    return duracion;

  }



  convertirATreeNode(lista: ActividadPenetracion[], esHijo: boolean): TreeNode[] {

    let treeNode: TreeNode[] = [];

    if (lista == null || lista.length == 0)
      return null;

    if (!esHijo)
      this.totalRegistros += lista.length
    else
      this.totalRegistrosRelacionados += lista.length
    // Convertimos cada act a treenode (Recursividad Orales...)
    for (const act of lista) {
      act.esHijo = esHijo;
      treeNode.push({ data: act, children: this.convertirATreeNode(act.actividadesRelacionadas, true) })
    }

    return treeNode;
  }




  filaEsPenetracion(rowData: ActividadPenetracion) {
    return (rowData.ubicacionTecnica.includes('-X-') || rowData.ubicacionTecnica.includes('-PENET-')) && !rowData.esHijo;
  }

  filaEsPenetracionHija(rowData: ActividadPenetracion) {
    return (rowData.ubicacionTecnica.includes('-X-') || rowData.ubicacionTecnica.includes('-PENET-')) && rowData.esHijo;
  }
  filaEsRelacionada(rowData: ActividadPenetracion) {
    return !rowData.ubicacionTecnica.includes('-X-') && !rowData.ubicacionTecnica.includes('-PENET-') && rowData.esHijo;
  }

  formatearDivision(div: string): string {
    if (div == null || div.length == 0)
      return ''

    if (div == 'N')
      return 'N/A'
    if (div == '1')
      return 'I'
    if (div == '2')
      return 'II'
    if (div == '3')
      return 'III'
  }



  tooltipUbicacion(actividad: ActividadPenetracion) {
    return '<table id="ubicacion-tooltip">' +
      '<tbody class="tooltip-table">' +
      '<tr>' +
      '<td><label>Denominación Equipo: </label> </td>' +
      '<td>' + (actividad.denominacionEquipo != null ? actividad.denominacionEquipo : ' - ') + '</td>' +
      '</tr>' +
      '<tr>' +
      '<td><label> Cuarto: </label></td>' +
      '<td>' + (actividad.cuarto != null ? actividad.cuarto : ' - ') + '</td>' +
      '</tr>' +
      '<tr>' +
      '<td><label> Edificio: </label></td>' +
      '<td>' + (actividad.edificio != null ? actividad.edificio : ' - ') + '</td>' +
      '</tr>' +
      '<tr>' +
      '<td><label> Nivel:</label></td>' +
      '<td> ' + (actividad.nivel != null ? actividad.nivel : ' - ') + '</td>' +
      '</tr>' +
      '</tbody>' +
      '</table>';
  }
}
