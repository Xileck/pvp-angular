import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PvpService {

  private GrupoTrabajo: any = webORB.bind('com.cfemex.lv.se.apps.cavam.RecargaDAO', environment.ruta, null, null);

  private CavamDAO: any = webORB.bind('com.cfemex.lv.se.apps.cavam.OrdenTrabajoDAO', environment.ruta, null, null);

  private C97UbicacionDAO: any = webORB.bind('com.cfemex.lv.se.apps.c97sap.UbicacionTecnicaDAO', environment.ruta, null, null);

  private C97UbicacionCondicionDAO: any = webORB.bind('com.cfemex.lv.se.apps.c97sap.UbicacionTecnicaDAO', environment.ruta, null, null);

  tipoOperacion: string = 'R';
  unidadRecarga: number = 2;
  numeroRecarga: number = 17;

  constructor() { }

  public seleccionarOrdenTrabajo(numero: string) {
    return this.CavamDAO.seleccionarOrdenTrabajo(numero);
  }

  public seleccionarUbicacionTecnica(tag: string) {
    return this.C97UbicacionDAO.seleccionarUbicacionTecnica(tag);
  }

  public seleccionarUbicacionTecnicaCondicion(condicion: string[]) {
    return this.C97UbicacionCondicionDAO.seleccionarUbicacionTecnica(condicion);
  }

  public seleccionarGpoTrabajo():any []{
    return this.GrupoTrabajo.seleccionarGpoTrabajo();
  }

  public convertirMayusculas(event) {
    return event.target.value.toUpperCase();
  }
}
