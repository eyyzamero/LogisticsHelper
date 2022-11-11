import { TestBed } from '@angular/core/testing';

import { AssignmentsFormService } from './assignments-form.service';

describe('AssignmentsFormService', () => {
  let service: AssignmentsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentsFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});