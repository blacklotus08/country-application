import { TestBed } from '@angular/core/testing';

import { CountryEditGuard } from './country-edit.guard';

describe('CountryEditGuard', () => {
  let guard: CountryEditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CountryEditGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
