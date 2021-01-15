import { TestBed, inject } from '@angular/core/testing';

import { EmotionsService } from './emotions.service';

describe('EmotionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmotionsService]
    });
  });

  it('should be created', inject([EmotionsService], (service: EmotionsService) => {
    expect(service).toBeTruthy();
  }));
});
