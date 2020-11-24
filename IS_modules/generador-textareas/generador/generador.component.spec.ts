import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneradorComponent } from './generador.component';

describe('GeneradorComponent', () => {
  let component: GeneradorComponent;
  let fixture: ComponentFixture<GeneradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
