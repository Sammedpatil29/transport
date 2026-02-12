import { TestBed } from '@angular/core/testing';

import { RidesServiceService } from './rides-service.service';

describe('RidesServiceService', () => {
  let service: RidesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RidesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
