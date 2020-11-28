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

  private ActividadPenetracionBO: any = webORB.bind('com.cfemex.lv.se.apps.pvp.negocio.ActividadPenetracionBO', environment.ruta, null, null);

  private ActividadPenetracionDAO: any = webORB.bind('com.cfemex.lv.se.apps.pvp.DAO.ActividadPenetracionDAO', environment.ruta, null, null);

  tipoOperacion: string = 'R';
  unidadRecarga: number = 2;
  numeroRecarga: number = 17;

  constructor() {
    this.test()
  }

  async test() {
    let test: any = await webORB.bind('com.cfemex.lv.se.apps.cavam.OrdenTrabajoDAO', environment.ruta, null, null);
    console.log(test)
  }


  public seleccionarOrdenTrabajo(numero: string) {
    return this.CavamDAO.seleccionarOrdenTrabajo(numero);
  }

  public seleccionarUbicacionTecnica(tag: string) {
    return this.C97UbicacionDAO.seleccionarUbicacionTecnica(tag);
  }

  public seleccionarUbicacionTecnicaCondicion(condicion: string[]) {
    return this.C97UbicacionCondicionDAO.seleccionarUbicacionTecnica(condicion);
  }

  public seleccionarGpoTrabajo(): any[] {
    return this.GrupoTrabajo.seleccionarGpoTrabajo();
  }

  public convertirMayusculas(event) {
    return event.target.value.toUpperCase();
  }

  public seleccionarActividadPenetracionCondicion(condiciones: string[]) {
    return this.ActividadPenetracionBO.seleccionarActividadPenetracionCondicion(condiciones);
  }

  public async obtenerDenominacionEquipos(ubicacion: string): Promise<string[]> {
    if (ubicacion != null)
      return await this.ActividadPenetracionDAO.obtenerDenominacionEquipos(ubicacion);
    return null
  }
}
