import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosSistemaComponent } from './usuarios-sistema.component';

describe('UsuariosSistemaComponent', () => {
  let component: UsuariosSistemaComponent;
  let fixture: ComponentFixture<UsuariosSistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
