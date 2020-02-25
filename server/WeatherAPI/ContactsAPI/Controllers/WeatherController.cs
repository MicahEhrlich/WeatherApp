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
        const string WEATHER_BY_CITY = "http://api.openweathermap.org/data/2.5/group";
        const string WEATHER_BY_POS = "http://api.openweathermap.org/data/2.5/weather";
        const string KEY = "826c9246b7afeb56971fd1e805e56f16";

        static HttpClient client = new HttpClient();
        // GET: api/Weather
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        public async Task<HttpResponseMessage> GetAsync(string id, string units = "metric")
        {
            try
            {
                string idListParam = id.ToString();
                string url = $"{WEATHER_BY_CITY}?id={idListParam}&units={units}&appid={KEY}";

                using (var client = new HttpClient())
                {
                    var res = await client.GetStringAsync(url);
                    var jsonResponse = JsonConvert.DeserializeObject(res);
                    return Request.CreateResponse(HttpStatusCode.OK, jsonResponse);
                }
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }


        public async Task<HttpResponseMessage> GetAsync(int lat, int lon, string units = "metric")
        {
            try
            {
                string url = $"{WEATHER_BY_POS}?lat={lat}&lon={lon}&units={units}&appid={KEY}";

                using (var client = new HttpClient())
                {
                    var res = await client.GetStringAsync(url);
                    var jsonResponse = JsonConvert.DeserializeObject(res);
                    return Request.CreateResponse(HttpStatusCode.OK, jsonResponse);
                }
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
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
