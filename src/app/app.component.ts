import { Component, ViewEncapsulation } from '@angular/core';
import { Constants } from './Clases/utils/Constants';
import { MensajesService } from './servicios/mensajes.service';
import { ServiciosGeneralesService } from './servicios/servicios-generales.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation:ViewEncapsulation.None
})

// Fechas Recarga
// U1-20R    	2020-08-15		2020-09-15
// U2-17R    	2020-11-17		2021-01-03

export class AppComponent  {
  readonly Constants= Constants;

  constructor(public servicioMensajes:MensajesService,public serviciosGenerales :ServiciosGeneralesService ){

  }
}
