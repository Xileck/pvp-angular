import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Constants} from '../Clases/utils/Constants';

@Injectable()
export class ExisteSesionService implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate() {
        if (localStorage.getItem(Constants.InformacionUsuario)) {
            this.router.navigate([Constants.VistaInicio]);
            return false;
        }
        return true;
    }
}
