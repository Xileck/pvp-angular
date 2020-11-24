import { Constants } from './../../Clases/utils/Constants';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validar-usuario',
  templateUrl: './validar-usuario.component.html',
  styleUrls: ['./validar-usuario.component.css']
})
export class ValidarUsuarioComponent implements OnInit {

  readonly NombreProyecto = environment.nombreProyecto;
  readonly Constants = Constants;

  constructor() { }

  ngOnInit() {
  }

}
