import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaComponent } from './vista.component';

describe('VistaComponent', () => {
  let component: VistaComponent;
  let fixture: ComponentFixture<VistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
