import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampanitaNotificacionesComponent } from './campanita-notificaciones.component';

describe('CampanitaNotificacionesComponent', () => {
  let component: CampanitaNotificacionesComponent;
  let fixture: ComponentFixture<CampanitaNotificacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampanitaNotificacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampanitaNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
