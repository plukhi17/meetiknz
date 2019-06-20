import { TestBed } from '@angular/core/testing';

import { PMapService } from './p-map.service';

describe('PMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PMapService = TestBed.get(PMapService);
    expect(service).toBeTruthy();
  });
});
