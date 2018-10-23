import { TestBed, inject } from '@angular/core/testing';

import { LaboratoryService } from './laboratory.service';

describe('LaboratoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LaboratoryService]
    });
  });

  it('should be created', inject([LaboratoryService], (service: LaboratoryService) => {
    expect(service).toBeTruthy();
  }));
});
