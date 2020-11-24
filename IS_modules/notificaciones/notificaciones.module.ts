import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {CampanitaNotificacionesComponent} from "./campanita-notificaciones/campanita-notificaciones.component";
import {TooltipModule} from "primeng/primeng";

@NgModule({
  exports:[
    CampanitaNotificacionesComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    //PrimeNG
    TooltipModule,
  ],
  declarations: [
    CampanitaNotificacionesComponent
  ],
  providers: [
  ]
})
export class NotificacionesModule { }
