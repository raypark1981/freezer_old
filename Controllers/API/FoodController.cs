using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Freezer.Models;
using Freezer.Repository;

namespace www.freezer.com.Controllers.API
{
    public class FoodController : ApiController
    {
        // GET: api/Food
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Food/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Food
        public string Post([FromBody]FreezerFood value)
        {
            if (value == null)
                return "null!!";

            var repository = new FreezerRepository();
            int rtnVal = repository.CreateFoodMaster(value);

            if (rtnVal > 0)
                return rtnVal.ToString();
            else
                return "-1";
        }

        // PUT: api/Food/5
        public void Put(int id, [FromBody]string value)
        {

        }

        // DELETE: api/Food/5
        public void Delete(int id)
        {
        }
    }
}
