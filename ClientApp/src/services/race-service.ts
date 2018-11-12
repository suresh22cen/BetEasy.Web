import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from '../models/Result';
import { environment } from '../environments/environment';
import { Subject } from "rxjs";
import { RaceEvent } from '../models/RaceEvent';

@Injectable()
export class RaceService {
  public eventData$: Subject<Result<RaceEvent>> = new Subject<Result<RaceEvent>>();

  constructor(private httpClient: HttpClient) { }

  updateEvents(): void {
    // Call API to get list of events and publish the events as subject
    this.httpClient.get<Result<RaceEvent>>(environment.race_APIUrl)
      .subscribe(
      (data) => { this.eventData$.next(data); }, (error) => { throw error; });
  }
}
