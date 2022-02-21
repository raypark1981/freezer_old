using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Routing;
using System.Web;
using Freezer.Models;
using Freezer.CustomAuthentication;
using Freezer.Repository;

namespace www.freezer.com.Controllers.API
{
    public class UserFreezerController : ApiController
    {
        // GET: api/UserFreezer
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/UserFreezer/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/UserFreezer
        public string Post([FromBody]MyFreezer value)
        {
            var repository = new Freezer_UserRepository { };

            int retVal = 0;
            retVal = repository.CreateUserFreezer(value, ((CustomPrincipal)HttpContext.Current.User).UserKey);

            if (retVal > 0)
                return retVal.ToString();
            else
                return "-1";
        }

        // PUT: api/UserFreezer/5
        public void Put(int id, [FromBody]MyFreezer value)
        {

        }

        // DELETE: api/UserFreezer/5
        public void Delete(int id)
        {
        }
    }
}
