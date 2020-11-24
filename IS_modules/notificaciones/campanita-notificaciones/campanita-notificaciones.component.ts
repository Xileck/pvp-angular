import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-campanita-notificaciones',
  templateUrl: './campanita-notificaciones.component.html',
  styleUrls: ['./campanita-notificaciones.component.css']
})
export class CampanitaNotificacionesComponent implements OnInit {
  // Inputs
  private _numNoti: number;
  private _toolTip: string;
  // Outputs
  @Output() private notificacionPresionada = new EventEmitter();
  /*Variables*/
  private _toolTipReplaced: string;

  constructor() {
    this.toolTip = '';
    this.numNoti = 0;
  }

  ngOnInit() {

  }

  /*--- EVENTOS ---*/
  campanaClic(): void {
    this.notificacionPresionada.emit('En construcción');
  }


  /*--- GETTERS y SETTERS ---*/
  @Input()
  get numNoti(): number {
    return this._numNoti;
  }

  set numNoti(value: number) {
    this._numNoti = (value > 0) ? value : 0;
    this.toolTipReplaced = this._toolTip;
  }

  @Input()
  get toolTip(): string {
    return this._toolTip;
  }

  set toolTip(value: string) {
    this._toolTip = value;
    this.toolTipReplaced = this._toolTip;
  }

  get toolTipReplaced(): string {
    return this._toolTipReplaced;
  }

  set toolTipReplaced(value: string) {
    this._toolTipReplaced = (value != null) ?
      value.replace('%n', '' + this._numNoti) : '';
  }
}
