import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HackingAnimationComponent } from './hacking-animation.component';

describe('HackingAnimationComponent', () => {
  let component: HackingAnimationComponent;
  let fixture: ComponentFixture<HackingAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HackingAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackingAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
