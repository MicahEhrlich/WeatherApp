using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ContactsAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class WeatherController : ApiController
    {
        const string WEATHER_BY_CITY = "http://api.openweathermap.org/data/2.5/weather";
        const string KEY = "826c9246b7afeb56971fd1e805e56f16";
        static HttpClient client = new HttpClient();

        // GET: api/Weather
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Weather/5
        public async Task<HttpResponseMessage> GetAsync(string city)
        {
            try
            {
                var re = Request;
                string url = $"{WEATHER_BY_CITY}?q={city}&appid={KEY}";

                using (var client = new HttpClient())
                {
                    var res = await client.GetStringAsync(url);
                    return Request.CreateResponse(HttpStatusCode.OK, res);
                }
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.Created);
            }
        }

        // POST: api/Weather
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Weather/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Weather/5
        public void Delete(int id)
        {
        }
    }
}
