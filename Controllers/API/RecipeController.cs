using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using Freezer.Models;
using Freezer.Lucene;
using System.IO;
using System.Configuration;
using Freezer.CustomAuthentication;
using Freezer.Repository;
using System.Text;
using System.Web.Script.Serialization;

namespace www.freezer.com.Controllers.API
{
    /// <summary>
    /// 
    /// </summary>
    public class RecipeController : ApiController
    {
        // GET: api/Recipe
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Recipe/5
        public HttpResponseMessage Get(int id)
        {
            var repository = new RecipeRepository();
            DisplayRecipe Recipe = repository.getRecipeBySeq(id);

            var response = Request.CreateResponse(HttpStatusCode.OK);
            var jsonStr = new JavaScriptSerializer().Serialize(Recipe);
            response.Content = new StringContent(jsonStr, Encoding.UTF8, "application/json");
            return response;
        }

        // POST: api/Recipe
        public string Post([FromBody]FreezerRecipe value)
        {
            if (value == null)
                return "null!!";

            var repository = new RecipeRepository();
            int rtnVal = repository.CreateRecipe(value);

            if (rtnVal > 0)
                return rtnVal.ToString();
            else
                return "-1";
        }

        // PUT: api/Recipe/5
        public string Put(int id, [FromBody]string value)
        {
            string retVal = "";
            if (value.Equals("view"))
            {
                var repository = new RecipeRepository();
                int rtnVal = repository.increaseViewCount(id);

                if (rtnVal > 0)
                    retVal = rtnVal.ToString();
                else
                    retVal = "-1";
            }
            else if (value.Equals("like"))
            {

            }

            return retVal;
        }

        // DELETE: api/Recipe/5
        public void Delete(int id)
        {
        }
    }
}
