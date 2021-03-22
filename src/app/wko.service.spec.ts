import { TestBed } from '@angular/core/testing';

import { WkoService } from './wko.service';

describe('WkoService', () => {
  let service: WkoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WkoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
