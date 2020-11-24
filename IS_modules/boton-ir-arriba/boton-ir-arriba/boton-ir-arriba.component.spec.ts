import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonIrArribaComponent } from './boton-ir-arriba.component';

describe('BotonIrArribaComponent', () => {
  let component: BotonIrArribaComponent;
  let fixture: ComponentFixture<BotonIrArribaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotonIrArribaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonIrArribaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
