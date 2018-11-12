using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BetEasy.Models
{
    public class Result<T> where T: class, new()
    {
        public IEnumerable<T> result { get; set; }
    }
}
