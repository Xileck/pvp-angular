import {Injectable} from '@angular/core';
import {EmpleadoBusEmpl} from '../BusEmpl-clases/BEANs/EmpleadoBusEmpl';
import {FotoBusEmpl} from '../BusEmpl-clases/BEANs/FotoBusEmpl';
import {environment} from '../../../src/environments/environment';

@Injectable()
export class BusquedaEmpleadoService {

  constructor() {
  }

  /*Funciones Weborb*/

  public seleccionarEmpleados(texto: string): EmpleadoBusEmpl[] {
    const BusquedaEmpleadoBO = webORB.bind('com.cfemex.lv.dis.apps.busquedaempleado.negocio.BusquedaEmpleadoBO',
      environment.ruta, null, null);
    return BusquedaEmpleadoBO.seleccionarEmpleados(texto);
  }

  public seleccionarCompletoEmpleadoPorNip(nip: string): EmpleadoBusEmpl {
    const BusquedaEmpleadoBO = webORB.bind('com.cfemex.lv.dis.apps.busquedaempleado.negocio.BusquedaEmpleadoBO',
      environment.ruta, null, null);
    return BusquedaEmpleadoBO.seleccionarCompletoEmpleadoPorNip(nip);
  }

  public seleccionarFoto(nip: string): FotoBusEmpl {
    const BusquedaEmpleadoBO = webORB.bind('com.cfemex.lv.dis.apps.busquedaempleado.negocio.BusquedaEmpleadoBO',
      environment.ruta, null, null);
    return BusquedaEmpleadoBO.seleccionarFoto(nip);
  }
  public seleccionarEmpl(rpe:string):any{
    const EmplDAO = webORB.bind('com.cfemex.lv.is.apps.intranet.EmplDAO',
      environment.ruta, null, null);
    return  EmplDAO.datosEmpleado(rpe);
  }

  public seleccionarEmplSentinel(nip:number):any{
    const SentinelDao = webORB.bind('com.cfemex.lv.apps.sentinel.siscop.negocio.PersonaGCNBO',
      environment.ruta, null, null);
    return  SentinelDao.seleccionarPersonaNIP(nip);
  }
}

export const EmpleadoDummy = {
  nip: '',
  telefono: '',
  correo: '',
  nombreCompleto: '',
  rpe: '',
  cvearea: '',
  nisd:'',
  evaluaciones:[]
};

export const FotoEmpleadoDummy = {
  nip: '',
  foto: null
};
