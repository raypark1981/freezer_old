using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Freezer.Models;
using Freezer.CustomAuthentication;
using Freezer.Repository;

namespace www.freezer.com.Controllers.API
{
    public class UserSectionController : ApiController
    {
        // GET: api/UserSection
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/UserSection/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/UserSection
        public void Post([FromBody]MyFreezer value)
        {
        }

        // PUT: api/UserSection/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/UserSection/5
        public void Delete(int id)
        {
        }
    }
}
