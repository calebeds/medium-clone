import { TestBed } from '@angular/core/testing';

import { PersistanceService } from './persistence.service';

describe('PersistenceService', () => {
  let service: PersistanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersistanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
