import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Combo_general } from '../Clases/BEANs/Combo_general';
import { UbicacionTec } from '../Clases/BEANs/UbicacionTec';

@Injectable({
  providedIn: 'root'
})
export class InformacionGeneralService {

  public SistemaBO: any = webORB.bind('com.cfemex.lv.is.apps.pam10.negocio.SistemaBO', environment.ruta, null, null);
  public ComponenteBO: any = webORB.bind('com.cfemex.lv.is.apps.pam10.negocio.ComponenteBO', environment.ruta, null, null);
  public UbicacionTecBO: any = webORB.bind('com.cfemex.lv.is.apps.pam10.negocio.UbicacionTecBO', environment.ruta, null, null);
  public EquipoBO: any = webORB.bind('com.cfemex.lv.is.apps.pam10.negocio.EquipoBO', environment.ruta, null, null);

  constructor() { }

  public seleccionarDisciplina(): Combo_general[] {
    const DisciplinasBO: any = webORB.bind('com.cfemex.lv.is.apps.pam10.negocio.PuestoTrabajoBO', environment.ruta, null, null);
    return DisciplinasBO.seleccionarDisciplina();
  }

  public seleccionarSistemas(unidad: string): Combo_general[] {
    return this.SistemaBO.seleccionarSistemas(unidad);
  }

  public seleccionarComponentes(unidad: string, sistema: string): Combo_general[] {
    return this.ComponenteBO.seleccionarComponentes(unidad, sistema);
  }

  public seleccionarUbicaciones(unidad: string, sistema: string, componente: string): UbicacionTec[] {
    return this.UbicacionTecBO.seleccionarUbicacionTec(unidad, sistema, componente);
  }

}
