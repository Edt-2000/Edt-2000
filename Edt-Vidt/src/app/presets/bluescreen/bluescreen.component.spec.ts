import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BluescreenComponent } from './bluescreen.component';

describe('BluescreenComponent', () => {
  let component: BluescreenComponent;
  let fixture: ComponentFixture<BluescreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BluescreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BluescreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
