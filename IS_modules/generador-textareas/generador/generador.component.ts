import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {TextArray} from '../generador-clases/TextArray';
import {TextArrayHijo} from '../generador-clases/TextArray-hijo';

@Component({
  selector: 'app-generador',
  templateUrl: './generador.component.html',
  styleUrls: ['./generador.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GeneradorComponent implements OnInit {
  // Inputs
  private _arregloDeTextos: TextArray[];
  @Input() identificadorTextArea: string;
  @Input() conSubindice: boolean; // Indica si la opción de subíndices está encendida (true) o apagada
  // Outputs
  @Output() arregloDeTextosChange: EventEmitter<TextArray[]> = new EventEmitter();
  @Output() hayCambios = new EventEmitter();
  // Variables
  showViewTextGenerated: boolean;

  private readonly abcArray = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  private readonly EnterKeyCode = 'Enter';
  private readonly EnterNumKeyCode = 'NumpadEnter';

  constructor() {
    this.arregloDeTextos = [];
    this.identificadorTextArea = 'textArray';
    this.conSubindice = false;
    this.showViewTextGenerated = false;
  }

  ngOnInit() {
    this.fillAbcArray();
  }

  /*Llena aún más el arreglo abcArray con el abecedario con apóstofres*/
  private fillAbcArray() {
    let primasContador = 1;
    const primasMax = 2;
    const abcArrayOriginalLength = this.abcArray.length;
    let apostrofes = '';

    while (primasContador <= primasMax) {
      apostrofes = apostrofes + '\'';
      for (let i = 1; i < abcArrayOriginalLength; i++) {
        this.abcArray.push(this.abcArray[i] + apostrofes);
      }

      primasContador++;
    }
  }

  reorder_parents() {
    let i = 1;
    for (const element of this._arregloDeTextos) {
      element.position = i;
      i++;
    }
    this.hayCambiosAviso();
  }

  private reorder_childs(parentPosition: number) {
    let i = 1;
    const parentArrayPosition = parentPosition - 1;

    if (this._arregloDeTextos[parentArrayPosition].subIndexes != null) {
      for (const subindex of this._arregloDeTextos[parentArrayPosition].subIndexes) {
        subindex.position = i;
        i++;
      }
    }
    this.hayCambiosAviso();
  }

  private setFocus(idHTML) {
    if ((document.getElementById(idHTML) == null) || (typeof document.getElementById(idHTML) === 'undefined')) {
      setTimeout(() => {
          this.setFocus(idHTML);
        },
        500);
    } else {
      document.getElementById(idHTML).focus();
    }
  }

  /*Elimina el último salto de línea ocasionado por el usuario al apretar ENTER para insertar otro elemento a la lista.
  params:
    position-Posición que ve el usuario del arreglo padre.
    childPosition-Posición que ve el usuario del arreglo hijo.
      Si es menor a Cero entonces el método funcionará sobre un elemento del arreglo padre, si es mayor o igual a Cero
      funcionará sobre un subíndice.*/
  private deleteLineBreak(position: number, childPosition: number) {
    const arrayPosition = position - 1;
    const arrayChildPosition = childPosition - 1;

    if (arrayChildPosition < 0) { // Padre
      this._arregloDeTextos[arrayPosition].text = this._arregloDeTextos[arrayPosition].text.replace(/^\s+|\s+$/g, '');
    } else {                       // Hijos
      this._arregloDeTextos[arrayPosition].subIndexes[arrayChildPosition].text =
        this._arregloDeTextos[arrayPosition].subIndexes[arrayChildPosition].text.replace(/^\s+|\s+$/g, '');
    }
  }

  private hayCambiosAviso(): void {
    this.hayCambios.emit('Hay cambios');
  }


  /*--- EVENTOS ---*/

  /*Evento que se activa cuando el usuario presiona alguna tecla dentro del input del order list principal*/
  enterKeyPressed_Parent(event: any, position: number): void {
    // Checar si se presionó la tecla ENTER
    if ((event.code === this.EnterKeyCode) || (event.code === this.EnterNumKeyCode)) {
      this.deleteLineBreak(position, -1);
      this._arregloDeTextos.push(new TextArray(this._arregloDeTextos.length + 1, '', null));
      this.setFocus('#' + this.identificadorTextArea + (this._arregloDeTextos.length));
    }
    this.hayCambiosAviso();
  }

  /*Evento que se activa cuando el usuario presiona alguna tecla dentro del input del order list de subíndices*/
  enterKeyPressed_subindex(event: any, positionParent: number, positionChild: number): void {
    // Checar si se presionó la tecla ENTER
    if ((event.code === this.EnterKeyCode) || (event.code === this.EnterNumKeyCode)) {
      const lastSubIndexPosition: number = this._arregloDeTextos[positionParent - 1].subIndexes.length;
      const parentArrayPosition: number = positionParent - 1;

      this.deleteLineBreak(positionParent, positionChild);
      this._arregloDeTextos[parentArrayPosition].subIndexes.push(new TextArrayHijo((lastSubIndexPosition + 1), ''));
      this.setFocus('#' + this.identificadorTextArea + positionParent + '-' + (lastSubIndexPosition + 1));
    }
    this.hayCambiosAviso();
  }

  deleteItem(position: number) {
    if (this._arregloDeTextos.length > 1) {
      const arrayPosition: number = position - 1;
      this._arregloDeTextos.splice(arrayPosition, 1);
      this.reorder_parents();
    } else {
      this._arregloDeTextos[0].text = '';
      this._arregloDeTextos[0].subIndexes = null;
      this._arregloDeTextos[0].position = 1;
    }
    this.hayCambiosAviso();
  }

  deleteItem_children(positionParent: number, positionChildren: number) {
    const arrayParentPosition: number = positionParent - 1;
    if (this._arregloDeTextos[arrayParentPosition].subIndexes.length > 1) {
      const arrayChildrenPosition: number = positionChildren - 1;
      this._arregloDeTextos[arrayParentPosition].subIndexes.splice(arrayChildrenPosition, 1);
      this.reorder_childs(positionParent);
    } else {
      this._arregloDeTextos[arrayParentPosition].subIndexes = null;
    }
    this.hayCambiosAviso();
  }

  addSubElement_fromParent(position: number) {
    if (this._arregloDeTextos.length > 1) {

      if (position > 1) {
        const arrayCurrentPosition: number = position - 1;
        const arrayTrueParentPosition: number = position - 2;
        const subIndexText = '' + this._arregloDeTextos[arrayCurrentPosition].text;

        if (this._arregloDeTextos[arrayCurrentPosition].subIndexes == null) {
          if (this._arregloDeTextos[arrayTrueParentPosition].subIndexes == null) {
            this._arregloDeTextos[arrayTrueParentPosition].subIndexes = [new TextArrayHijo(1, subIndexText)];
          } else {
            const lastSubIndexPosition: number = this._arregloDeTextos[arrayTrueParentPosition].subIndexes.length;
            this._arregloDeTextos[arrayTrueParentPosition].subIndexes.push(new TextArrayHijo((lastSubIndexPosition + 1), subIndexText));
          }

          this._arregloDeTextos.splice(arrayCurrentPosition, 1);
          this.reorder_parents();
        } else {
          if (this._arregloDeTextos[arrayTrueParentPosition].subIndexes == null) {
            this._arregloDeTextos[arrayTrueParentPosition].subIndexes = [new TextArrayHijo(1, subIndexText)];
          } else {
            const lastSubIndexPosition: number = this._arregloDeTextos[arrayTrueParentPosition].subIndexes.length;
            this._arregloDeTextos[arrayTrueParentPosition].subIndexes.push(new TextArrayHijo((lastSubIndexPosition + 1), subIndexText));
          }

          this._arregloDeTextos.splice(arrayCurrentPosition, 1);
          this.reorder_parents();
        }
        this.hayCambiosAviso();
      }

    }
  }

  convertSubElementToMain(positionParent: number, positionChildren: number) {
    const arrayParentPosition = positionParent - 1;
    const arrayChildrenPosition = positionChildren - 1;
    const elementConverted = new TextArray(1, this._arregloDeTextos[arrayParentPosition].subIndexes[arrayChildrenPosition].text, null);

    // Insertar el subindice en los elementos princpales, en la posición que le sigue al padre original
    this._arregloDeTextos.splice((arrayParentPosition + 1), 0, elementConverted);
    // Eliminar el subíndice
    if (this._arregloDeTextos[arrayParentPosition].subIndexes.length > 1) {
      this._arregloDeTextos[arrayParentPosition].subIndexes.splice(arrayChildrenPosition, 1);
    } else {
      this._arregloDeTextos[arrayParentPosition].subIndexes = null;
    }
    this.reorder_parents();
    this.reorder_childs(positionParent);

  }

  previewBtn_click() {
    this.showViewTextGenerated = true;
  }

  /*--- GETTERS y SETTERS ---*/
  @Input()
  get arregloDeTextos(): TextArray[] {
    return this._arregloDeTextos;
  }

  set arregloDeTextos(value: TextArray[]) {
    this._arregloDeTextos = ( (value != null) && (value.length > 0) ) ?
      value : [new TextArray(1, '', null)];
    this.arregloDeTextosChange.emit(this.arregloDeTextos);
    this.hayCambiosAviso();
  }

}
