import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class NavegadorCompatibilidadService implements CanActivate {
  VistaNoCompatible: string;
  VistaPrincipal: string;
  ElNavegadorEsCompatible: boolean;

  constructor(private router: Router ) {
    this.VistaNoCompatible = 'no-compatible';
    this.VistaPrincipal = 'home';
    this.ElNavegadorEsCompatible = false;
  }

  canActivate() {
    const navVersion = this.detectIE().trim();
    this.ElNavegadorEsCompatible = navVersion.length === 0 || ((navVersion.length > 0) && (parseInt(navVersion, 10) >= 11));
    // this.ElNavegadorEsCompatible = (navVersion.length === 0);

    if (!this.ElNavegadorEsCompatible) {
      this.router.navigate([this.VistaNoCompatible]);
      return false;
    }
    return true;
  }

  public detectIE(): string {
    const ua = window.navigator.userAgent;

    const msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return '' + parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    const trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      const rv = ua.indexOf('rv:');
      // this.versionIE = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
      return '' + parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    // other browser
    return '';
  }


}
