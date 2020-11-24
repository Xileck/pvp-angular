import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaOtComponent } from './busqueda-ot.component';

describe('BusquedaOtComponent', () => {
  let component: BusquedaOtComponent;
  let fixture: ComponentFixture<BusquedaOtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaOtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaOtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
