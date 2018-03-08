import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoGlitcherComponent } from './photo-glitcher.component';

describe('PhotoGlitcherComponent', () => {
  let component: PhotoGlitcherComponent;
  let fixture: ComponentFixture<PhotoGlitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoGlitcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoGlitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
