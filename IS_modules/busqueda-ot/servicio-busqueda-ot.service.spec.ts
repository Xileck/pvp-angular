import { TestBed, inject } from '@angular/core/testing';

import { ServicioBusquedaOtService } from './servicio-busqueda-ot.service';

describe('ServicioBusquedaOtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicioBusquedaOtService]
    });
  });

  it('should be created', inject([ServicioBusquedaOtService], (service: ServicioBusquedaOtService) => {
    expect(service).toBeTruthy();
  }));
});
