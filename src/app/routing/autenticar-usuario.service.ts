import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Constants} from '../Clases/utils/Constants';
import {LoginAccessService} from "../../../IS_modules/login-module/login-access.service";

@Injectable()
export class AutenticarUsuarioService implements CanActivate {

    constructor(private router: Router,
                private servicioLogin: LoginAccessService) {

    }

    /*El método canActivate que redirige desde el approuting a la vista de login en caso de ser necesario.*/
    canActivate() {
        if (localStorage.getItem(Constants.InformacionUsuario)) {
            this.servicioLogin.recuperarDeLocalStorage();

            return true;
        } else {
            this.router.navigate([Constants.VistaAcceso]);
            return false;
        }
    }

}
