import { TestBed } from '@angular/core/testing';

import { LoadingObservableService } from './loading-observable.service';

describe('LoadingObservableService', () => {
  let service: LoadingObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});