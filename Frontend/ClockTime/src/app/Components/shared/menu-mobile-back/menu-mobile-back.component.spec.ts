import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMobileBackComponent } from './menu-mobile-back.component';

describe('MenuMobileBackComponent', () => {
  let component: MenuMobileBackComponent;
  let fixture: ComponentFixture<MenuMobileBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuMobileBackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuMobileBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
