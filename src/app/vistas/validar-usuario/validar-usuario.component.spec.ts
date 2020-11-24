import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarUsuarioComponent } from './validar-usuario.component';

describe('ValidarUsuarioComponent', () => {
  let component: ValidarUsuarioComponent;
  let fixture: ComponentFixture<ValidarUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
