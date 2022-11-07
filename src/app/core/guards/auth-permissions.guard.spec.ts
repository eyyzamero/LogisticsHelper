import { TestBed } from '@angular/core/testing';

import { AuthPermissionsGuard } from './auth-permissions.guard';

describe('AuthPermissionsGuard', () => {
  let guard: AuthPermissionsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthPermissionsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});