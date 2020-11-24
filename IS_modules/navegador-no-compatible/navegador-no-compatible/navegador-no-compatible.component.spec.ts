import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegadorNoCompatibleComponent } from './navegador-no-compatible.component';

describe('NavegadorNoCompatibleComponent', () => {
  let component: NavegadorNoCompatibleComponent;
  let fixture: ComponentFixture<NavegadorNoCompatibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegadorNoCompatibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegadorNoCompatibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
