import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios-sistema',
  templateUrl: './usuarios-sistema.component.html',
  styleUrls: ['./usuarios-sistema.component.css']
})
export class UsuariosSistemaComponent implements OnInit {

  readonly NombreProyecto = environment.nombreProyecto;

  constructor() { }

  ngOnInit() {
  }

}
