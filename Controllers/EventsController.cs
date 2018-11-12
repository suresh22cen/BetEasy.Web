using BetEasy.Interfaces;
using BetEasy.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace BetEasy.Controllers
{
    [Route("api/[controller]")]
    public class EventsController : Controller
    {

        private readonly IEventsServiceAccessor _eventsServiceAccessor;

        public EventsController(IEventsServiceAccessor eventsServiceAccessor)
        {
            _eventsServiceAccessor = eventsServiceAccessor;
        }

        /// <summary>
        /// Events list API to get list of events
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("list")]
        public async Task<Result<Event>> GetEventsListAsync()
        {
            return await _eventsServiceAccessor.GetEventsListAsync();
        }

       
    }
}
