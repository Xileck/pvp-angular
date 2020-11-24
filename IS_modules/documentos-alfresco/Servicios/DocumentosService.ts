import {throwError as observableThrowError} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../../src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class DocumentosService {
  rutaWebORB = environment.ruta;
  // rutaServlet: string = environment.rutaServletDoctos;
  rutaServlet = 'http://gcnti.lv.cfemex.com/weborb/SubeAlfresco';
  servicioDoctos: any = webORB.bind('com.cfemex.lv.alfrescov2.negocio.GCNBO', this.rutaWebORB, null, null);
  servicioArchivos: any = webORB.bind('com.cfemex.lv.alfrescov2.negocio.AlfrescoBO', this.rutaWebORB, null, null);

  constructor(private http: HttpClient) {
  }

  seleccionarDocumentos(homeDir: string, homeDinDir: string) {
    return this.servicioDoctos.buscarArchivoPorLlave(homeDir, homeDinDir);
  }

  mostrarArchivo(id: string): string {
    return this.servicioArchivos.mostrarArchivo(id);
  }

  subirArchivo(formData: FormData): Observable<any> {
    return this.http.post(this.rutaServlet + '', formData)
      .map(res => res)
      .catch(this.handleError);
  }

  eliminarDocumento(id: string): Observable<any> {
    return this.servicioArchivos.eliminarDocumento(id);
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return observableThrowError(errMsg);
  }

}
