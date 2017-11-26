import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridscapeComponent } from './gridscape.component';

describe('GridscapeComponent', () => {
  let component: GridscapeComponent;
  let fixture: ComponentFixture<GridscapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridscapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridscapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
