import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-boton-ir-arriba',
  templateUrl: './boton-ir-arriba.component.html',
  styleUrls: ['./boton-ir-arriba.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BotonIrArribaComponent implements OnInit {
  btnIrArriba_visible: boolean;

  constructor() {
    this.btnIrArriba_visible = false;
  }

  ngOnInit() {
    this.checkScrollBehaviour();
  }

  clic_irArriba(): void {
    window.scrollTo(0, 0);
  }

  private checkScrollBehaviour() {
    window.onscroll = function () {
      this.btnIrArriba_visible = ( window.scrollY > 150 );
    }.bind(this);
  }

}
