import { BusquedaAreaModule } from './busqueda-area.module';

describe('BusquedaAreaModule', () => {
  let busquedaAreaModule: BusquedaAreaModule;

  beforeEach(() => {
    busquedaAreaModule = new BusquedaAreaModule();
  });

  it('should create an instance', () => {
    expect(busquedaAreaModule).toBeTruthy();
  });
});
