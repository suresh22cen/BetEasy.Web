import { TestBed } from '@angular/core/testing';

import { RaceService } from '../src/services/race-service';

describe('RaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RaceService = TestBed.get(RaceService);
    expect(service).toBeTruthy();
  });

  it('should return events from API  ', () => {
    const service: RaceService = TestBed.get(RaceService);
    service.eventData$.subscribe((data) => {
      expect(data).not.toBeNull();
      expect(data.result.length).toBeGreaterThan(0);
    });

    service.updateEvents();
    expect(service.eventData$.subscribe).toHaveBeenCalled();
  });

  it("should throw error when there's any issue on API", () => {
    const service: RaceService = new RaceService(null);
    service.eventData$.subscribe((data) => {

    });

    service.updateEvents();
    expect(service.eventData$).toThrow();
    expect(service.eventData$.subscribe).not.toHaveBeenCalled();
  }
});
