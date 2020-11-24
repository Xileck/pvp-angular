import { BusquedaOtModule } from './busqueda-ot.module';

describe('BusquedaOtModule', () => {
  let busquedaOtModule: BusquedaOtModule;

  beforeEach(() => {
    busquedaOtModule = new BusquedaOtModule();
  });

  it('should create an instance', () => {
    expect(busquedaOtModule).toBeTruthy();
  });
});
