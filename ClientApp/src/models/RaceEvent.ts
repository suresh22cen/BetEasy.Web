import { RaceType } from "./RaceType";
import { Venue } from "./Venue";

export class RaceEvent {
    EventID: Number;
    MasterEventID: Number;
    EventName: string;
    EventTypeDesc: string;
    MasterEventName: string;
    AdvertisedStartTime: string;
    RaceNumber: Number;
    EventType: RaceType;
    Venue: Venue
    IsMultiAllowed: boolean;
    Slug: string;
    DateSlug: string;
    RacingStreamAllowed: boolean;
    RacingReplayStreamAllowed: boolean;
 }
