import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {environment} from '../../../src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-vista-mantenimiento',
    templateUrl: './vista-mantenimiento.component.html',
    styleUrls: ['./vista-mantenimiento.component.css']
})
export class VistaMantenimientoComponent implements OnInit {
    mantenimientoJson: any;
    esLocal: boolean;

    constructor(private http: HttpClient) {
        this.mantenimientoJson = null;
        this.esLocal = false;
    }

    ngOnInit() {
        this.http.get('src/assets/Mantenimiento/sitio-mantenimiento.json')
            .subscribe(data => {
                    this.mantenimientoJson = data;
                }
            );
        this.esLocal = (environment.ruta.indexOf('localhost') >= 0);
    }

    /*A partir de un datetime devuelve un string con formato dd/mm/aaaa H:m:s*/
    formatDatetimeString(datetime: string): string {
        if ((datetime == null) || (datetime.length === 0)) {
            return '-';
        }

        const datetimeSplited: string[] = datetime.split(' ');
        const dateSplited: string[] = datetimeSplited[0].split('-');
        const timeSplited: string[] = datetimeSplited[1].split(':');
        const dia: string = '' + this.zeroPad(dateSplited[2], 2);
        const mes: string = '' + this.zeroPad(dateSplited[1], 2);
        const anio: string = '' + this.zeroPad(dateSplited[0], 2);
        const hora: string = '' + this.zeroPad(timeSplited[0], 2);
        const min: string = '' + this.zeroPad(timeSplited[1], 2);

        return dia + '/' + mes + '/' + anio + ' ' + hora + ':' + min;
    }

    private zeroPad(numero: string, maxLength: number): String {
        let stringToReturn: String = '' + numero;
        while (stringToReturn.length < maxLength) {
            stringToReturn = '0' + stringToReturn;
        }
        return stringToReturn;
    }

}
