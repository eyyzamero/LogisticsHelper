import { TestBed } from '@angular/core/testing';

import { TabsMapperService } from './tabs-mapper.service';

describe('TabsMapperService', () => {
  let service: TabsMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabsMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});