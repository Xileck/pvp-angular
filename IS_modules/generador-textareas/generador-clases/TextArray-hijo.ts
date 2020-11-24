 /**
 * Created by D256V on 07/12/2017.
 */
export class TextArrayHijo {
   private _position: number;
   private _text: string;

   constructor(position: number, text: string) {
     this._position = position;
     this._text = text;
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
}
