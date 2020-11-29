import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PvpService {

  private RecargaDAO: any = webORB.bind('com.cfemex.lv.se.apps.cavam.RecargaDAO', environment.ruta, null, null);

  private CavamDAO: any = webORB.bind('com.cfemex.lv.se.apps.cavam.OrdenTrabajoDAO', environment.ruta, null, null);

  private C97UbicacionDAO: any = webORB.bind('com.cfemex.lv.se.apps.c97sap.UbicacionTecnicaDAO', environment.ruta, null, null);

  private C97UbicacionCondicionDAO: any = webORB.bind('com.cfemex.lv.se.apps.c97sap.UbicacionTecnicaDAO', environment.ruta, null, null);

  private ActividadPenetracionBO: any = webORB.bind('com.cfemex.lv.se.apps.pvp.negocio.ActividadPenetracionBO', environment.ruta, null, null);

  private ActividadPenetracionDAO: any = webORB.bind('com.cfemex.lv.se.apps.pvp.DAO.ActividadPenetracionDAO', environment.ruta, null, null);

  public tipoOperacion: string;
  public unidadRecarga: number;
  public numeroRecarga: number;

  constructor() {
  }

  public async obtenerDatosRecarga(): Promise<boolean> {
    let recargas: any[] = await this.RecargaDAO.datosRecarga();

    if (recargas == null || recargas.length == 0)
      return false;

    let recarga = recargas[0];
    this.tipoOperacion = 'R'
    this.unidadRecarga = recarga.unidadRecarga;
    this.numeroRecarga = recarga.numeroRecarga;

    console.log(this.unidadRecarga)
    return true;

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
    return this.RecargaDAO.seleccionarGpoTrabajo();
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
