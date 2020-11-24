import { Injectable } from '@angular/core';
import {Message} from 'primeng/primeng';

@Injectable()
export class RolesMensajesService {
  /*Tipos de mensajes p-growl*/
  public static readonly Pgrowl_Succes = 'success';
  public static readonly Pgrowl_Info = 'info';
  public static readonly Pgrowl_Warn = 'warn';
  public static readonly Pgrowl_Error = 'error';
  public pGrowlMessage: Message[];
  public pGrowl_BGcolor: string[];

  constructor() {
  }

  public showTempMessage(severity: string, title: string, message: string): void {
    this.pGrowlMessage = [];
    this.pGrowlMessage.push({severity: severity, summary: title, detail: message});
    this.setTempBgColor(severity);
  }

  private setTempBgColor(severity: string) {
    this.pGrowl_BGcolor = [];
    switch (severity) {
      case RolesMensajesService.Pgrowl_Succes: {
        this.pGrowl_BGcolor.push('pgrowl-success');
        break;
      }
      case RolesMensajesService.Pgrowl_Error: {
        this.pGrowl_BGcolor.push('pgrowl-error');
        break;
      }
      case RolesMensajesService.Pgrowl_Info: {
        this.pGrowl_BGcolor.push('pgrowl-info');
        break;
      }
      default: { // Warning
        this.pGrowl_BGcolor.push('pgrowl-warn');
        break;
      }
    }
  }

}
