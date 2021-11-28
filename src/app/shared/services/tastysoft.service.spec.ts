import { TestBed } from '@angular/core/testing';

import { TastysoftService } from './tastysoft.service';

describe('TastysoftService', () => {
  let service: TastysoftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TastysoftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
