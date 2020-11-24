import { ServiciosGeneralesService } from './../../servicios/servicios-generales.service';
import { LoginAccessService } from './../../../../IS_modules/login-module/login-access.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  display: boolean = false;
  constructor(public loginService: LoginAccessService, private serviciosGenerales:ServiciosGeneralesService) { }

  ngOnInit() {
    if (this.loginService.isLogued())
      this.display = true;
  }

  mostrarMenu(){
    this.serviciosGenerales.togleSlideMenu();

  }
}
