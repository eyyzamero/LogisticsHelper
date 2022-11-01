import { TestBed } from '@angular/core/testing';

import { AuthObservableModelObtainedGuard } from './auth-observable-model-obtained.guard';

describe('AuthObservableModelObtainedGuard', () => {
  let guard: AuthObservableModelObtainedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthObservableModelObtainedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
