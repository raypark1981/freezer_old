using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Text;
using System.Web.Script.Serialization;
using Freezer.Models;
using Freezer.Repository;

namespace www.freezer.com.Controllers.API
{
    public class MyPageController : ApiController
    {
        // GET: api/MyPage
        public HttpResponseMessage Get()
        {
            CommonController common = new CommonController();
            string userKey = common.UserKey;

            if (string.IsNullOrEmpty(userKey))
            {
                var response = Request.CreateResponse(HttpStatusCode.Unauthorized);
                var jsonStr = "{\"msg\": \"unknownUser\"}";
                response.Content = new StringContent(jsonStr, Encoding.UTF8, "application/json");
                return response;
            }
            else
            {
                var repository = new MyPageRepository();
                Freezer_User _Freezer_User = repository.getUserInfo(userKey);

                var response = Request.CreateResponse(HttpStatusCode.OK);
                var jsonStr = new JavaScriptSerializer().Serialize(_Freezer_User);
                response.Content = new StringContent(jsonStr, Encoding.UTF8, "application/json");
                return response;
            }
            
        }

        // GET: api/MyPage/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/MyPage
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/MyPage/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/MyPage/5
        public void Delete(int id)
        {
        }
    }
}
