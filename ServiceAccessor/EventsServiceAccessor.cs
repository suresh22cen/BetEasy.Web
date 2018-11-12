using BetEasy.Interfaces;
using BetEasy.Models;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace BetEasy.ServiceAccessor
{
    internal class EventsServiceAccessor : IEventsServiceAccessor
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IOptions<RaceConfiguration> _raceConfiguration;

        public EventsServiceAccessor(IOptions<RaceConfiguration> raceConfiguration, IHttpClientFactory httpClientFactory)
        {
            _raceConfiguration = raceConfiguration;
            _httpClientFactory = httpClientFactory;
        }

        /// <summary>
        /// Call the API to retrieve the events list and return
        /// </summary>
        /// <returns></returns>
        async Task<Result<Event>> IEventsServiceAccessor.GetEventsListAsync()
        {
            // Create http clent from client factory
            var httpClient = _httpClientFactory.CreateClient();
            var response = await httpClient.GetAsync(_raceConfiguration.Value.EventsUrl);

            //De-serialize to object and return list of events
            return JsonConvert.DeserializeObject<Result<Event>>(await response.Content.ReadAsStringAsync());           
        }
    }
}
