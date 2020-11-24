import { Injectable } from '@angular/core';
import {Area} from "../busquedaArea-beans/Area";
import {environment} from "../../../src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BusquedaAreaService {

  constructor() { }

  public obtenerTodasLasAreas(): Area[] {
    const RespiradorBO: any = webORB.bind('com.cfemex.lv.AreaDAO', environment.ruta, null, null);
    const where = ['vigencia = \'S\''];
    return RespiradorBO.seleccionarArea(where);
  }
}
