import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDeslizableComponent } from './menu-deslizable.component';

describe('MenuDeslizableComponent', () => {
  let component: MenuDeslizableComponent;
  let fixture: ComponentFixture<MenuDeslizableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDeslizableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDeslizableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
