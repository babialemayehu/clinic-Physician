import { TestBed, inject } from '@angular/core/testing';

import { PatientQueueService } from './patient-queue.service';

describe('PatientQueueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientQueueService]
    });
  });

  it('should be created', inject([PatientQueueService], (service: PatientQueueService) => {
    expect(service).toBeTruthy();
  }));
});
