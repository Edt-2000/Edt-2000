import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreensavebouncerComponent } from './screensavebouncer.component';

describe('ScreensavebouncerComponent', () => {
  let component: ScreensavebouncerComponent;
  let fixture: ComponentFixture<ScreensavebouncerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreensavebouncerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreensavebouncerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
