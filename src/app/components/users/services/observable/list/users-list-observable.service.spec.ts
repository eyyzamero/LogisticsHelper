import { TestBed } from '@angular/core/testing';

import { UsersListObservableService } from './users-list-observable.service';

describe('UsersListObservableService', () => {
  let service: UsersListObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersListObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});