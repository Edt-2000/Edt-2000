import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HackerTvComponent } from './hacker-tv.component';

describe('HackerTvComponent', () => {
  let component: HackerTvComponent;
  let fixture: ComponentFixture<HackerTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HackerTvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackerTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
