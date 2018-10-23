import { TestBed, inject } from '@angular/core/testing';

import { HisstoryService } from './hisstory.service';

describe('HisstoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HisstoryService]
    });
  });

  it('should be created', inject([HisstoryService], (service: HisstoryService) => {
    expect(service).toBeTruthy();
  }));
});
