using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using Freezer.Models;
using Freezer.CustomAuthentication;
using Freezer.Repository;
using System.Text;
using System.Web.Script.Serialization;

namespace www.freezer.com.Controllers.API
{
    public class FreezerFoodController : ApiController
    {
        //string UserGrade = ((CustomPrincipal)HttpContext.Current.User).UserGrade;

        // GET: api/FreezerFood
        public HttpResponseMessage Get()
        {
            var repository = new FreezerFoodRepository();
            //MyFreezerFood MyFreezerFoods = repository.getFreezerFoodByKey(((CustomPrincipal)HttpContext.Current.User).UserKey, "");
            MyFreezerFood MyFreezerFoods = repository.getFreezerFoodByKey("00000001", "");

            var response = Request.CreateResponse(HttpStatusCode.OK);
            var jsonStr = new JavaScriptSerializer().Serialize(MyFreezerFoods);
            response.Content = new StringContent(jsonStr, Encoding.UTF8, "application/json");
            return response;

            //return 
        }

        // GET: api/FreezerFood/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/FreezerFood
        public void Post([FromBody]MyFreezerFood value)
        {
            //var repository = new FreezerRepository();
            //repository.updateFreezerFoodByKey("00000001", value);
        }

        // PUT: api/FreezerFood/5
        public void Put([FromBody]MyFreezerFood value)
        {
            var repository = new FreezerFoodRepository();
            repository.updateFreezerFoodByKey("00000001", value);
        }

        // DELETE: api/FreezerFood/5
        public void Delete(int id)
        {
        }
    }
}
