import { TestBed } from '@angular/core/testing';

import { AssignmentsMapperService } from './assignments-mapper.service';

describe('AssignmentsMapperService', () => {
  let service: AssignmentsMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentsMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
