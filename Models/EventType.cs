using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BetEasy.Models
{
    public class EventType
    {
        public int EventTypeID { get; set; }
        public string EventTypeDesc { get; set; }
        public int MasterEventTypeID { get; set; }
        public string Slug { get; set; }
    }
}
