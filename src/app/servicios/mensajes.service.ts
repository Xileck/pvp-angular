import {Injectable} from '@angular/core';
import {Message} from 'primeng/primeng';
import {Constants} from '../Clases/utils/Constants';

@Injectable()
export class MensajesService {
  // Mensaje temporal
  private _pGrowlMessage: Message[];
  public pGrowl_BGcolor: string[];
  // Variables que utiliza el popup de diálogo
  private _dialogDisplay: boolean;
  private _dialogMessage: string;
  private _dialogTitleMsg: string;

  constructor() {
    this.pGrowlMessage  = [];
    this.dialogDisplay  = false;
    this.dialogMessage  = '';
    this.dialogTitleMsg = '';
  }

  showTempMessage(severity: string, title: string, message: string): void {
    this._pGrowlMessage = [];
    this._pGrowlMessage.push({severity: severity, summary: title, detail: message});
    this.setTempBgColor(severity);
  }

  setTempBgColor(severity: string) {
    this.pGrowl_BGcolor = [];
    switch (severity) {
      case Constants.Pgrowl_Succes: {
        this.pGrowl_BGcolor.push('pgrowl-success');
        break;
      }
      case Constants.Pgrowl_Error: {
        this.pGrowl_BGcolor.push('pgrowl-error');
        break;
      }
      case Constants.Pgrowl_Info: {
        this.pGrowl_BGcolor.push('pgrowl-info');
        break;
      }
      default: { // Warning
        this.pGrowl_BGcolor.push('pgrowl-warn');
        break;
      }
    }
  }

  /*Hace visible o no un popup de diálogo para el usuario.
  params:
    message - Cadena de texto que se quiere mostrar en el mensaje. Si está vacía entonces se ocultará el popup de diálogo.*/
  public showDialogMessage(title: string, message: string): void {
    if (message.length > 0) {
      this._dialogDisplay = true;
      this._dialogMessage = message;
      this._dialogTitleMsg = title;
    } else {
      this._dialogDisplay = false;
      this._dialogMessage = '';
      this._dialogTitleMsg = '';
    }
  }

  /*--- GETTERs Y SETTERs ---*/

  get pGrowlMessage(): Message[] {
    return this._pGrowlMessage;
  }

  set pGrowlMessage(value: Message[]) {
    this._pGrowlMessage = value;
  }

  get dialogDisplay(): boolean {
    return this._dialogDisplay;
  }

  set dialogDisplay(value: boolean) {
    this._dialogDisplay = value;
  }

  get dialogMessage(): string {
    return this._dialogMessage;
  }

  set dialogMessage(value: string) {
    this._dialogMessage = value;
  }

  get dialogTitleMsg(): string {
    return this._dialogTitleMsg;
  }

  set dialogTitleMsg(value: string) {
    this._dialogTitleMsg = value;
  }
}
