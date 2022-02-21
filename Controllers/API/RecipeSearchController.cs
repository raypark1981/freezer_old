using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Freezer.Models;
using Freezer.Repository;
using System.Text;
using System.Web.Script.Serialization;
using Freezer.Lucene;
using System.IO;
using System.Web;
using System.Configuration;

namespace www.freezer.com.Controllers.API
{
    public class RecipeSearchController : ApiController
    {

        /// <summary>
        /// 
        /// </summary>
        /// <param name="type">search - 재료,종류,방법을 가지고 레시피 찾기 / hot - 인기레시피 top 10 / like - 내가 하트누른 레시피</param>
        /// <param name="recipeParam"></param>
        /// <returns></returns>
        // GET: api/RecipeSearch
        public HttpResponseMessage Get(string type, [FromUri]RecipeSearchParam recipeParam)
        {
            
            FreezerRecipeIndex _FreezerRecipeIndex = null;

            
            if (type.ToUpper().IndexOf("SEARCH") > -1)
            {

                //search 의 경우, recipeParam 필수!
                if (recipeParam == null)
                {
                    var response = Request.CreateResponse(HttpStatusCode.BadRequest);
                    var jsonStr = "";
                    response.Content = new StringContent(jsonStr, Encoding.UTF8, "application/json");
                    return response;
                }
                else
                {

                    //LuceneRecipe._luceneDir = Path.Combine(Path.GetDirectoryName(Path.GetDirectoryName(HttpContext.Current.Request.PhysicalApplicationPath)), ConfigurationManager.AppSettings["RecipeLucenePAth"]);
                    LuceneRecipe._luceneDir = Path.Combine(HttpContext.Current.Request.PhysicalApplicationPath, ConfigurationManager.AppSettings["RecipeLucenePAth"]);
                    List<RecipeIndex> _RecipeIndex = null;

                    if(type.ToUpper().Equals("SEARCH")) _RecipeIndex = LuceneRecipe.Search(recipeParam.dtls).ToList();
                    else _RecipeIndex = LuceneRecipe.Search(recipeParam.dtls, "RCP_NM").ToList();

                    if (_RecipeIndex.Count > 0)
                    {
                        _FreezerRecipeIndex = new FreezerRecipeIndex();
                        _FreezerRecipeIndex.RecipeIndexlist = _RecipeIndex;

                        if (!string.IsNullOrEmpty(recipeParam.way2))
                        {
                            _FreezerRecipeIndex.RecipeIndexlist = _FreezerRecipeIndex.RecipeIndexlist.Where(s => s.RCP_WAY2 == recipeParam.way2).ToList<RecipeIndex>();
                        }

                        if (!string.IsNullOrEmpty(recipeParam.pat2))
                        {
                            _FreezerRecipeIndex.RecipeIndexlist = _FreezerRecipeIndex.RecipeIndexlist.Where(s => s.RCP_PAT2 == recipeParam.pat2).ToList<RecipeIndex>();
                        }
                    }

                    var response = Request.CreateResponse(HttpStatusCode.OK);
                    var jsonStr = new JavaScriptSerializer().Serialize(_FreezerRecipeIndex);
                    response.Content = new StringContent(jsonStr, Encoding.UTF8, "application/json");
                    return response;
                }

            }
            else if (type.ToUpper().Equals("HOT"))
            {

                var repository = new RecipeSearchRepository();
                _FreezerRecipeIndex = repository.getHotResipeList();

                var response = Request.CreateResponse(HttpStatusCode.OK);
                var jsonStr = new JavaScriptSerializer().Serialize(_FreezerRecipeIndex);
                response.Content = new StringContent(jsonStr, Encoding.UTF8, "application/json");
                return response;
            }
            else
            {
                var response = Request.CreateResponse(HttpStatusCode.OK);
                var jsonStr = new JavaScriptSerializer().Serialize(_FreezerRecipeIndex);
                response.Content = new StringContent(jsonStr, Encoding.UTF8, "application/json");
                return response;
            }
       
        }

        // GET: api/RecipeSearch/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/RecipeSearch
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/RecipeSearch/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/RecipeSearch/5
        public void Delete(int id)
        {
        }
    }
}
