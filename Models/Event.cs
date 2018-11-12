using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BetEasy.Models
{
    public class Event
    {
        public int EventID { get; set; }
        public int MasterEventID { get; set; }
        public string EventName { get; set; }
        public string EventTypeDesc { get; set; }
        public string MasterEventName{ get; set; }
        public DateTime AdvertisedStartTime { get; set; }
        public int RaceNumber { get; set; }
        public EventType EventType { get; set; }
        public Venue Venue { get; set; }
        public bool IsMultiAllowed { get; set; }
        public string Slug { get; set; }
        public string DateSlug { get; set; }
        public bool acingStreamAllowed { get; set; }
        public bool RacingReplayStreamAllowed { get; set; }
    }
}
