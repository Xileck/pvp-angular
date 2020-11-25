import { ExisteSesionService } from './existe-sesion.service';
import { Constants } from './../Clases/utils/Constants';
import { AutenticarUsuarioService } from './autenticar-usuario.service';
import { ValidarUsuarioComponent } from './../vistas/validar-usuario/validar-usuario.component';
import { MainComponent } from './../vistas/main/main.component';
import { NavegadorCompatibilidadService } from './../../../IS_modules/navegador-no-compatible/navegador-compatibilidad.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavegadorNoCompatibleComponent } from 'IS_modules/navegador-no-compatible/navegador-no-compatible/navegador-no-compatible.component';


export const ROUTES: Routes =
  [
    { path: '', redirectTo: Constants.VistaAcceso, pathMatch: 'full' },
    { path: Constants.VistaAcceso, component: ValidarUsuarioComponent, canActivate: [NavegadorCompatibilidadService, ExisteSesionService] },
    { path: Constants.VistaInicio, component: MainComponent, canActivate: [NavegadorCompatibilidadService, AutenticarUsuarioService] },
    { path: 'no-compatible', component: NavegadorNoCompatibleComponent }

  ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
