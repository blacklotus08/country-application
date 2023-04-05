import { TestBed } from '@angular/core/testing';

import { CountryDetailService } from './country-detail.service';

describe('CountryDetailService', () => {
  let service: CountryDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
