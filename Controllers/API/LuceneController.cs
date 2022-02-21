using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Freezer.Models;
using Freezer.Repository;
using System.Web.Script.Serialization;
using System.Text;
using System.Web.Mvc;

namespace www.freezer.com.Controllers.API
{
    public class LuceneController : ApiController
    {
        // GET: api/Lucene
        public HttpResponseMessage Get(int rowsPerPage, int pageNumber, string type = "")
        {
            var repository = new SearchRepository();

            if (type.ToUpper().Equals("RECIPE"))
            {
                FreezerRecipeIndex SearchRecipeIndex = repository.getRecipeIndexInfo(rowsPerPage, pageNumber);

                var response = Request.CreateResponse(HttpStatusCode.OK);
                var jsonStr = new JavaScriptSerializer().Serialize(SearchRecipeIndex);
                response.Content = new StringContent(jsonStr, Encoding.UTF8, "application/json");
                return response;
            }
            else
            {
                FreezerSearchIndex SearchIndex = repository.getFoodIndexInfo(rowsPerPage, pageNumber);

                var response = Request.CreateResponse(HttpStatusCode.OK);
                var jsonStr = new JavaScriptSerializer().Serialize(SearchIndex);
                response.Content = new StringContent(jsonStr, Encoding.UTF8, "application/json");
                return response;
            }
            
        }

        // GET: api/Lucene/1000/1
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Lucene
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Lucene/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Lucene/5
        public void Delete(int id)
        {
        }
    }
}
