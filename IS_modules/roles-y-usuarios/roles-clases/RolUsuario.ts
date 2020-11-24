/**
 * Creado por VEG el 09/07/2018.
 */
import {AccesosRol} from './AccesosRol';

export interface RolUsuario {
  cve_usuario: string;
  cve_proy: string;
  cve_areagpo: string;
  cve_rol: string;
  nip: string;
  password: string;
  permisos: string;
  nipSuplente: string;
  accesos: AccesosRol[];
  descrol: string;
  nombreCompleto: string;
}
