import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaAreaComponent } from './busqueda-area.component';

describe('BusquedaAreaComponent', () => {
  let component: BusquedaAreaComponent;
  let fixture: ComponentFixture<BusquedaAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
