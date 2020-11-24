/**
 * Creado por VEG el 09/07/2018.
 */
import {Modulo} from './Modulo';
import {Rol} from './Rol';

export interface PermisosUsuario {
  modulos: Modulo[];
  roles: Rol[];
}
