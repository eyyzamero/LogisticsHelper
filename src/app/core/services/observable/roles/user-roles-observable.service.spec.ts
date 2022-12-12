import { TestBed } from '@angular/core/testing';

import { UserRolesObservableService } from './user-roles-observable.service';

describe('UserRolesObservableService', () => {
  let service: UserRolesObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRolesObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});