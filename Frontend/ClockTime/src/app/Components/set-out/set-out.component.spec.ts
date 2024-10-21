import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetOutComponent } from './set-out.component';

describe('SetOutComponent', () => {
  let component: SetOutComponent;
  let fixture: ComponentFixture<SetOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetOutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
