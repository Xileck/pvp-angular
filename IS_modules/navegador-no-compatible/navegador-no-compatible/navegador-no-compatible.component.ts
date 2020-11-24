import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {NavegadorCompatibilidadService} from '../navegador-compatibilidad.service';

@Component({
  selector: 'app-navegador-no-compatible',
  templateUrl: './navegador-no-compatible.component.html',
  styleUrls: ['./navegador-no-compatible.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavegadorNoCompatibleComponent implements OnInit {

  url:string = location.protocol + '//' + location.host;
  constructor(
    private router: Router,
    public servicioNavCompatible: NavegadorCompatibilidadService) {
  }

  ngOnInit() {
    const navVersion = this.servicioNavCompatible.detectIE().trim();
    this.servicioNavCompatible.ElNavegadorEsCompatible = navVersion.length === 0 || ((navVersion.length > 0) &&
      (parseInt(navVersion, 10) >= 11));
    // this.servicioNavCompatible.ElNavegadorEsCompatible = (navVersion.length === 0);
    if ( this.servicioNavCompatible.ElNavegadorEsCompatible ) {
      this.router.navigate([this.servicioNavCompatible.VistaPrincipal]);
    }
  }
}
