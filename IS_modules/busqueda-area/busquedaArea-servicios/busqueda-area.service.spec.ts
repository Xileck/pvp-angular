import { TestBed, inject } from '@angular/core/testing';

import { BusquedaAreaService } from './busqueda-area.service';

describe('BusquedaAreaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusquedaAreaService]
    });
  });

  it('should be created', inject([BusquedaAreaService], (service: BusquedaAreaService) => {
    expect(service).toBeTruthy();
  }));
});
