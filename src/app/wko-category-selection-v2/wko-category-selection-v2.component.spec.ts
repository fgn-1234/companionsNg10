import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WkoCategorySelectionV2Component } from './wko-category-selection-v2.component';

describe('WkoCategorySelectionV2Component', () => {
  let component: WkoCategorySelectionV2Component;
  let fixture: ComponentFixture<WkoCategorySelectionV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WkoCategorySelectionV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WkoCategorySelectionV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
