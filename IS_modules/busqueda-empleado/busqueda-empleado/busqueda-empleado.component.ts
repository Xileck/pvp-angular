import { Component, DoCheck, EventEmitter, Input, OnInit, Output, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { EmpleadoBusEmpl } from '../BusEmpl-clases/BEANs/EmpleadoBusEmpl';
import { BusquedaEmpleadoService, EmpleadoDummy, FotoEmpleadoDummy } from '../servicios-busempl/busqueda-empleado.service';
import { FotoBusEmpl } from '../BusEmpl-clases/BEANs/FotoBusEmpl';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-busqueda-empleado',
  templateUrl: './busqueda-empleado.component.html',
  styleUrls: ['./busqueda-empleado.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BusquedaEmpleadoComponent implements OnInit, DoCheck {
  /*--- Observable ---*/
  empleado$ = new Observable<EmpleadoBusEmpl>();
  private empleadoSubject$ = new Subject<EmpleadoBusEmpl>();
  /*--- Inputs ---*/
  busEmpl_seleccionado: EmpleadoBusEmpl;
  @Output() busEmpl_seleccionadoChange = new EventEmitter();
  @Input() modoEscritura: boolean;
  @Input() nipEmpleado: string;

  nipEmpleadoAnterior: string;
  private nipDoCheck: boolean;
  /*--- Variables ---*/
  busEmpl_seleccionadoAux: EmpleadoBusEmpl;
  empleadoFoto: FotoBusEmpl;
  busEmpl_dialogShow: boolean;
  busEmpl_texto: string;
  listaEmpleados: EmpleadoBusEmpl[];
  tableLoader: boolean;
  spinerLoader: boolean;
  @ViewChild('inputBusEmpl_texto') inputBusEmplTexto: any;
  /*--- Constantes ---*/
  private readonly EnterKeyCode = 'Enter';
  private readonly EnterNumKeyCode = 'NumpadEnter';
  readonly RutaImgs = 'src/assets/';
  readonly ColumnasEmpleados = [
    { field: 'rpe', header: 'RPE' },
    { field: 'nombreCompleto', header: 'Nombre' }
  ];

  constructor(private servicioBusquedaEmpleado: BusquedaEmpleadoService) {
    this.modoEscritura = true;
    this.busEmpl_dialogShow = false;
    this.tableLoader = false;
    this.nipDoCheck = true;
    this.nipEmpleado = '';
    this.nipEmpleadoAnterior = '';
    this.spinerLoader = false;
    this.limpiar();
  }

  ngOnInit() {
    // Suscribir el observable
    this.empleado$ = this.getEmpleado$();
    this.empleadoSubject$.subscribe(empleado => {
      this.busEmpl_seleccionado = empleado;

      this.busEmpl_seleccionadoChange.emit(this.busEmpl_seleccionado);
      if (this.busEmpl_seleccionado.nip.length === 0) {
        this.limpiar();
      }
    });
    //  Inicializar el objeto
    this.inicializarEmpleado();
  }

  ngDoCheck(): void {
    // Si hay cambios en el nipEmpleado entonces se va a actualizar el objeto (se manda el nip desde el componente padre)
    if (this.nipDoCheck && (this.nipEmpleado != null && this.nipEmpleado.length > 0) && (this.nipEmpleadoAnterior !== this.nipEmpleado)) {
      this.nipDoCheck = false;
      this.buscarPorNip();
    }
  }

  /*Limpia todos los inputs y objetos, se puede mandar a llamar desde un componente padre por medio de un viewchild.*/
  reiniciarTodo(): void {
    this.limpiar();
    //  Se establece el enfoque en el input
    this.inputBusEmplTexto.nativeElement.focus();
    this.inicializarEmpleado();
  }

  limpiar(): void {
    this.listaEmpleados = [];
    this.busEmpl_seleccionadoAux = null;
    this.busEmpl_texto = '';
    this.empleadoFoto = null;
  }

  confirm(): void {
    if (this.busEmpl_seleccionado != null) {
      this.mostrarSeleccionado();
    }
  }

  buscarPorNip(): void {
    this.spinerLoader = true;
    setTimeout(() => {
      Promise.resolve(this.servicioBusquedaEmpleado.seleccionarCompletoEmpleadoPorNip(this.nipEmpleado.trim())).then(resultado => {
        this.spinerLoader = false;
        this.nipDoCheck = true;
        if (resultado != null && resultado.nip.trim().length > 0) {
          this.busEmpl_seleccionadoAux = resultado;
          this.nipEmpleadoAnterior = this.busEmpl_seleccionadoAux.nip;
          this.mostrarSeleccionado();
        }
      }).catch(err => {
        console.log('Error en click_buscar de BusquedaEmpleadoComponent');
      });
    }, 1000
    );
  }

  private async mostrarSeleccionado() {
    this.busEmpl_dialogShow = false;

    this.busEmpl_texto = this.busEmpl_seleccionado.nombreCompleto;
    await this.consultarSentinel(this.busEmpl_seleccionadoAux.nip)
    await this.actualizarEmpleado(this.busEmpl_seleccionadoAux);

  }

  convertArrayBytesToBase64(byte: any): string {
    let binary = '';
    const bytes = new Uint8Array(byte);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  obtenerBotonSeleccionarTooltip(): string {
    return (this.busEmpl_seleccionadoAux != null) ?
      'Seleccionar a ' + this.busEmpl_seleccionadoAux.nombreCompleto : 'Seleccione un empleado';
  }

  /*Funciones del Observable*/

  inicializarEmpleado(): void {
    this.actualizarEmpleado(Object.assign({}, EmpleadoDummy));
  }

  private actualizarEmpleado(nuevoEmpleado: EmpleadoBusEmpl) {
    this.empleadoSubject$.next(nuevoEmpleado);
  }

  private getEmpleado$(): Observable<EmpleadoBusEmpl> {
    return this.empleadoSubject$.asObservable();
  }


  /*--- Eventos ---*/

  click_buscar(): void {
    this.busEmpl_dialogShow = true;
    this.tableLoader = true;
    this.listaEmpleados = [];
    setTimeout(() => {
      Promise.resolve(this.servicioBusquedaEmpleado.seleccionarEmpleados(this.busEmpl_texto.trim().toUpperCase())).then(resultado => {
        this.tableLoader = false;
        this.listaEmpleados = resultado;
      }).catch(err => {
        console.log('Error en click_buscar de BusquedaEmpleadoComponent');
      });
    }, 1000
    );
  }

  async consultarSentinel(nip: any) {
    let resultado = await this.servicioBusquedaEmpleado.seleccionarEmplSentinel(Number(nip));
    this.busEmpl_seleccionadoAux.nisd = resultado.nisd;
    this.busEmpl_seleccionadoAux.evaluaciones = resultado.evaluaciones

  }

  /*Se manda a llamar cuando el usuario escribe 5 caracteres que pueden ser un RPE.*/
  busquedaRapida(): void {
    this.spinerLoader = true;
    setTimeout(() => {
      Promise.resolve(this.servicioBusquedaEmpleado.seleccionarEmpleados(this.busEmpl_texto.trim().toUpperCase())).then(resultado => {
        this.spinerLoader = false;
        if (resultado != null && resultado.length > 0) {
          this.busEmpl_seleccionadoAux = resultado[0];


          this.mostrarSeleccionado();

        } else {
          this.inicializarEmpleado();
        }
      }).catch(err => {
        console.log('Error en click_buscar de BusquedaEmpleadoComponent');
      });
    }, 1000
    );
  }

  /*Evento que se activa cuando el usuario presiona alguna tecla dentro del input*/
  enterKeyPressed(event: any): void {
    // Checar si se presionó la tecla ENTER
    const LongitudTexto = this.busEmpl_texto.trim().length;
    if ((LongitudTexto > 0) && ((event.code === this.EnterKeyCode) || (event.code === this.EnterNumKeyCode))) {
      this.click_buscar();
    }
    if ((LongitudTexto === 5) && (this.busEmpl_texto.search('[0-9]') >= 0)) {
      this.busquedaRapida();
    }
  }

  verFoto(nip: string): void {
    this.tableLoader = true;
    this.empleadoFoto = FotoEmpleadoDummy;
    setTimeout(() => {
      Promise.resolve(this.servicioBusquedaEmpleado.seleccionarFoto(nip)).then(resultado => {
        this.tableLoader = false;
        if (resultado != null) {
          this.empleadoFoto = resultado;
        } else {
          this.empleadoFoto = null;
        }
      }).catch(err => {
        console.log('Error en verFoto de BusquedaEmpleadoComponent');
      });
    }, 1000
    );
  }
}
