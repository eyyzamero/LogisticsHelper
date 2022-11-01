import { TestBed } from '@angular/core/testing';

import { AssignmentsObservableService } from './assignments-observable.service';

describe('AssignmentsObservableService', () => {
  let service: AssignmentsObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentsObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
