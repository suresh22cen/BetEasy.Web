using BetEasy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BetEasy.Interfaces
{
    public interface IEventsServiceAccessor
    {
        Task<Result<Event>> GetEventsListAsync();
    }
}
