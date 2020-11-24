/**
* Created by D256V on 22/11/2017.
*/
import {TextArrayHijo} from './TextArray-hijo';

export class TextArray {
  private _position: number;
  private _text: string;
  private _subIndexes: TextArrayHijo[];

   constructor(position: number, text: string, subIndexes: TextArrayHijo[]) {
     this._position = position;
     this._text = text;
     this._subIndexes = subIndexes;
   }

   get position(): number {
    return this._position;
  }

  set position(value: number) {
    this._position = value;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get subIndexes(): TextArrayHijo[] {
    return this._subIndexes;
  }

  set subIndexes(value: TextArrayHijo[]) {
    this._subIndexes = value;
  }
 }
