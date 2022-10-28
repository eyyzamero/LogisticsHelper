import { TestBed } from '@angular/core/testing';

import { AuthMapperService } from './auth-mapper.service';

describe('AuthMapperService', () => {
  let service: AuthMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
