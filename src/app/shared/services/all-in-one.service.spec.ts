import { TestBed } from '@angular/core/testing';

import { AllInOneService } from './all-in-one.service';

describe('AllInOneService', () => {
  let service: AllInOneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllInOneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
