using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Freezer.Lucene;
using Freezer.Models;
using System.Web;
using System.IO;
using System.Configuration;
using System.Text;
using System.Web.Script.Serialization;

namespace www.freezer.com.Controllers.API
{
    public class SearchController : ApiController
    {
        // GET: api/Search
        public HttpResponseMessage Get(string word, string masterCode)
        {
            LuceneSearch._luceneDir = Path.Combine(HttpContext.Current.Request.PhysicalApplicationPath, ConfigurationManager.AppSettings["FoodLucenePAth"]);
            List<SearchIndex> _SearchIndex = null;
            _SearchIndex = LuceneSearch.Search(word).ToList();

            FreezerSearchIndex _FreezerSearchIndex = null;

            if (_SearchIndex.Count > 0)
            {
                _FreezerSearchIndex = new FreezerSearchIndex();
                _FreezerSearchIndex.SearchIndexlist = _SearchIndex;

                if(!string.IsNullOrEmpty(masterCode))
                {
                    _FreezerSearchIndex.SearchIndexlist = _FreezerSearchIndex.SearchIndexlist.Where(s => s.MasterCode == masterCode).ToList<SearchIndex>();
                }
            }

            var response = Request.CreateResponse(HttpStatusCode.OK);
            var jsonStr = "[]";
            if (_FreezerSearchIndex != null) { 
                jsonStr = new JavaScriptSerializer().Serialize(_FreezerSearchIndex.SearchIndexlist.Select(r => new { Food_CD = r.FOOD_CD, DESC_KOR = r.DESC_KOR , FoodGrpName = r.FoodGrpName , MasterCode = r.MasterCode }));
            }                                                                                                                                                     

            response.Content = new StringContent(jsonStr, Encoding.UTF8, "application/json");
            return response;
        }

        // GET: api/Search/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Search
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Search/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Search/5
        public void Delete(int id)
        {
        }
    }
}
