import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WkoLocationSelectionV2Component } from './wko-location-selection-v2.component';

describe('WkoLocationSelectionV2Component', () => {
  let component: WkoLocationSelectionV2Component;
  let fixture: ComponentFixture<WkoLocationSelectionV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WkoLocationSelectionV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WkoLocationSelectionV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
