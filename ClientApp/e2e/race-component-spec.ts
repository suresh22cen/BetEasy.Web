import { TestBed } from '@angular/core/testing';

import { RaceService } from '../src/services/race-service';
import { RacesComponent } from '../src/app/races/races.component';
import { RaceTypes } from '../src/enums/RaceTypes';

describe('Race Component Tests', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RaceService = TestBed.get(RaceService);
    expect(service).toBeTruthy();
  });

  it("should auto refresh events after fetching", () => {
    const service: RaceService = TestBed.get(RaceService);
    const component: RacesComponent = TestBed.get(RacesComponent);

    component.ngOnInit();
    setTimeout(() => {
      expect(component.refreshEventData).toHaveBeenCalled();
    }, 8000);
  });

  it("should filter events based on event type", () => {
    const component: RacesComponent = TestBed.get(RacesComponent);
    component.filteredEvents = null;
    component.filteredEvents(RaceTypes.Trots);
    expect(component.filteredEvents).toHaveBeenCalled();
    expect(component.filteredEvents).not.toBeNull();    
  });

  it("should filter events by type correctly. Check event type is filtered for exact type", () => {
    const component: RacesComponent = TestBed.get(RacesComponent);
    component.filteredEvents = null;
    component.filteredEvents(RaceTypes.Trots);
    expect(component.filteredEvents).toHaveBeenCalled();
    expect(component.filteredEvents).not.toBeNull();    
  });

  it("Thoroughbred filters thoroghbred", () => {
    const component: RacesComponent = TestBed.get(RacesComponent);
    component.selectedFilter = "";
    component.filteredEvents = null;
    component.filterThoroughbreads();
    expect(component.filteredEvents).toHaveBeenCalled();
    expect(component.selectedFilter).toEqual(RaceTypes.Thoroghbred.toString());
  });

  it("Greyhounds filters grey hounds", () => {
    const component: RacesComponent = TestBed.get(RacesComponent);
    component.selectedFilter = "";
    component.filteredEvents = null;
    component.filterGreyHounds();
    expect(component.filteredEvents).toHaveBeenCalled();
    expect(component.selectedFilter).toEqual(RaceTypes.Greyhounds.toString());
  });

  it("Trot filter filters trots", () => {
    const component: RacesComponent = TestBed.get(RacesComponent);
    component.selectedFilter = "";
    component.filteredEvents = null;
    component.filterTrots();
    expect(component.filteredEvents).toHaveBeenCalled();
    expect(component.selectedFilter).toEqual(RaceTypes.Trots.toString());
  });

  it("get Hour Min and Second differences properly", () => {
    let date = new Date();
    const component: RacesComponent = TestBed.get(RacesComponent);

    var result = component.getHourMinSecs(date.toString());

    expect(result).not.toBeNull();
    // Check the output minimum length 
    expect(result.toString().length).toBeGreaterThan(5);
  });

  it("should set error flag if API throws some error show we can show firendly error message on the page", () => {
    var mockRaceService = jasmine.createSpyObj("RaceService", ["updateEvents"]);

    //Mock the esrvice to throw exception
    mockRaceService.updateEvents.and.callFake(function () {
      throw "Unexpected Error";
    });

    const component: RacesComponent = new RacesComponent(mockRaceService);
    component.refreshEventData();

    setTimeout(() => {
      //Check error message is set correctly
      expect(component.errorMessage).not.toBeNull();
      expect(component.errorMessage.length).toEqual("Unexpected Error");
    }, 3000);
  });
});
