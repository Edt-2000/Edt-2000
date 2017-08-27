import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShutdownComponent } from './tv-shutdown.component';

describe('TvShutdownComponent', () => {
  let component: TvShutdownComponent;
  let fixture: ComponentFixture<TvShutdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvShutdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvShutdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
