import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePhotosComponent } from './save-photos.component';

describe('SavePhotosComponent', () => {
  let component: SavePhotosComponent;
  let fixture: ComponentFixture<SavePhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavePhotosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavePhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
