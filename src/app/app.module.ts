import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { ExisteSesionService } from './routing/existe-sesion.service';
import { ServiciosGeneralesService } from './servicios/servicios-generales.service';
import { MensajesService } from './servicios/mensajes.service';
import { AutenticarUsuarioService } from './routing/autenticar-usuario.service';
import { RolesYUsuariosModule } from './../../IS_modules/roles-y-usuarios/roles-y-usuarios.module';
import { LoginModule } from './../../IS_modules/login-module/login.module';
import { MenuDeslizableModule } from './../../IS_modules/menu-deslizable/menu-deslizable.module';
import { MenuDeslizableComponent } from './../../IS_modules/menu-deslizable/menu-deslizable/menu-deslizable.component';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import localeESMX from '@angular/common/locales/es-MX';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule, DialogModule, TooltipModule, OverlayPanelModule, ConfirmDialogModule, ProgressSpinnerModule, InputTextModule, TabViewModule, CheckboxModule, MessageModule, MessagesModule, FieldsetModule, CalendarModule, DropdownModule, TreeTableModule, MultiSelectModule, InputTextareaModule } from 'primeng';
import { TableModule } from 'primeng/table';
import { NavegadorNoCompatibleModule } from './../../IS_modules/navegador-no-compatible/navegador-no-compatible.module';
import { AppComponent } from './app.component';
import { RoutingModule } from './routing/routing.module';
import { MainComponent } from './vistas/main/main.component';
import { BusquedaEmpleadoModule } from '../../IS_modules/busqueda-empleado/busqueda-empleado.module';
import { ValidarUsuarioComponent } from './vistas/validar-usuario/validar-usuario.component';
import { HeaderComponent } from './vistas/header/header.component';
import { PvpService } from './servicios/pvp.service';

registerLocaleData(localeESMX);  

@NgModule({
  declarations: [
    AppComponent, 
    MainComponent,   
    ValidarUsuarioComponent, 
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,


    // Módulos de IS
    NavegadorNoCompatibleModule,
    BusquedaEmpleadoModule,
    MenuDeslizableModule,
    LoginModule,
    RolesYUsuariosModule,
    // Componentes de Primeng
    TooltipModule,
    ButtonModule,
    TableModule,
    DialogModule,
    RoutingModule,
    OverlayPanelModule,
    ConfirmDialogModule,
    PanelModule,
    ProgressSpinnerModule,
    ToastModule,
    InputTextModule,
    TabViewModule,
    CheckboxModule,
    MessageModule,
    MessagesModule,
    FieldsetModule,
    CalendarModule,
    DropdownModule,
    TreeTableModule,
    MultiSelectModule,
    InputTextareaModule


  ],
  providers: [
    AutenticarUsuarioService,
    ExisteSesionService,
    MensajesService,
    ServiciosGeneralesService,
    PvpService,
    { provide: LOCALE_ID, useValue: "es-MX" },
    //utilizar # para cambiar de ruta (este metodo hace que funcione el redireccionamiento en tomcat y jboss)
    { provide: LocationStrategy, useClass: HashLocationStrategy }],

  bootstrap: [AppComponent]
})
export class AppModule {
}
