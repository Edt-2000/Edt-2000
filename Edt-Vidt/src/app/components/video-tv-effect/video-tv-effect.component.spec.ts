import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTvEffectComponent } from './video-tv-effect.component';

describe('VideoTvEffectComponent', () => {
  let component: VideoTvEffectComponent;
  let fixture: ComponentFixture<VideoTvEffectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoTvEffectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoTvEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
