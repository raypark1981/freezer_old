using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Freezer.Models;
using System.Web.Security;
using Freezer.CustomAuthentication;
using System.Web;
using System.Web.Mvc;

namespace www.freezer.com.Controllers.API
{
    public class UserFoodController : ApiController
    {
        string UserGrade = ((CustomPrincipal)HttpContext.Current.User).UserName;
        // GET: api/userFood
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/userFood/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/userFood
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/userFood/5
        public void Put(int id, [FromBody]MyFood value)
        {

        }

        // DELETE: api/userFood/5
        public void Delete(int id)
        {
        }
    }
}
