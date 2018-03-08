import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoBounceComponent } from './photo-bounce.component';

describe('PhotoBounceComponent', () => {
  let component: PhotoBounceComponent;
  let fixture: ComponentFixture<PhotoBounceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoBounceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoBounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
