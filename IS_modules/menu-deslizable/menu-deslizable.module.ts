import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuDeslizableComponent } from './menu-deslizable/menu-deslizable.component';
import { SidebarModule, TooltipModule } from 'primeng/primeng';

@NgModule({
  declarations: [MenuDeslizableComponent],
  imports: [
    CommonModule,
    SidebarModule,
    TooltipModule,
    RouterModule
  ],
  exports: [MenuDeslizableComponent]
})
export class MenuDeslizableModule { }
