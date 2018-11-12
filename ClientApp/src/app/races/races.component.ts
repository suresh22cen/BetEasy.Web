import { Component, OnInit, OnDestroy } from '@angular/core';
import { RaceService } from '../../services/race-service';
import { Subscription } from 'rxjs';
import * as _ from "lodash";
import { RaceTypes } from '../../enums/RaceTypes';
import { RaceEvent } from '../../models/RaceEvent';

@Component({
  selector: 'races-home',
  templateUrl: './races.component.html',
  styleUrls: [
    './races.component.css'
  ]
})

  //Races Commponent to list all race events
export class RacesComponent implements OnInit, OnDestroy {

  events: RaceEvent[];
  filteredEvents: any;
  refreshInterval: any;
  raceEventsSubscription: Subscription;
  selectedFilter: string;
  errorMessage: string;

  constructor(private raceService: RaceService) {
    this.errorMessage = "";
  }

  //Initially show all events on page load
  //Subscribe to the race service which would publish events
  ngOnInit(): void {
    this.raceEventsSubscription = this.raceService.eventData$.subscribe(data => {
      this.errorMessage = "";
      this.events = data.result;
      this.clearFilter();

      //After getting the list, call refresh timer to refresh events list periodically
      this.refreshInterval = setInterval(
        () => {
        this.refreshEventData();
      }, 30000);
    }, (error) => { this.errorMessage = error; });

    this.refreshEventData();
  }

  clearFilter() {
    this.selectedFilter = "";
    this.filteredEvents = this.events;
  }

  //Set Event filter when the user clicks the button to filter
  filterTrots(): void {
    this.selectedFilter = RaceTypes[RaceTypes.Trots].toString();
    this.filterEvents(RaceTypes.Trots);
  }

  //Set Event filter when the user clicks the button to filter
  filterGreyHounds(): void {
    this.selectedFilter = RaceTypes[RaceTypes.Greyhounds].toString();
    this.filterEvents(RaceTypes.Greyhounds);
  }

  //Set Event filter when the user clicks the button to filter
  filterThoroughbreads(): void {
    this.selectedFilter = RaceTypes[RaceTypes.Thoroghbred].toString();
    this.filterEvents(RaceTypes.Thoroghbred);
  }

  //Filter the events so as to filter the specific event type. If it's all return all events
  private filterEvents(eventType: RaceTypes): void {
    this.filteredEvents = _.filter(this.events, (event: RaceEvent) => { return event.EventType.EventTypeID == eventType });
  }

  // Get hour min & sec from the passed date till now. Calculate and build a string
  //TODO: move this as a common function so it can be re-used
  getHourMinSecs(value: string): string {
    var currDate = new Date();
    var raceDate = new Date(value);

    let duration = currDate.valueOf() - raceDate.valueOf();

    let seconds = Math.round((duration / 1000) % 60);
    let minutes = Math.round((duration / (1000 * 60)) % 60);
    let hours = Math.round(((duration / (1000 * 60 * 60)) % 24));

    return (hours > 0 ? hours.toString() + "hrs " : "") + minutes.toString() + "m " + seconds.toString() + "s";
  }

  //Cancel the events subscription and remove refresh timer
  ngOnDestroy(): void {
    this.raceEventsSubscription.unsubscribe();
    clearInterval(this.refreshInterval);
  }

  refreshEventData() : void {
    this.raceService.updateEvents();
  }
}
