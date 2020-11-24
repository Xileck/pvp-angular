import { Injectable } from '@angular/core';
import { environment } from '../../src/environments/environment';
import { OrdenTrabajo } from './clases/OrdenTrabajo';

@Injectable({
  providedIn: 'root'
})
export class ServicioBusquedaOtService {
  constructor() { }

  public seleccionarOt(numero: string): OrdenTrabajo {
    const OrdenTrabajoDAO = webORB.bind('com.cfemex.lv.se.apps.cavam.OrdenTrabajoDAO', environment.ruta, null, null);
    return OrdenTrabajoDAO.seleccionarOrdenTrabajo(numero);
  }
}
