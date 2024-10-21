import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetEntryComponent } from './set-entry.component';

describe('SetEntryComponent', () => {
  let component: SetEntryComponent;
  let fixture: ComponentFixture<SetEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
