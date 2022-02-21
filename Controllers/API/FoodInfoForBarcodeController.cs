using Freezer.Common.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using www.freezer.com.Repository;

namespace www.freezer.com.Controllers.API
{
    public class FoodInfoForBarcodeController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(string id)
        {
            var repository = new FoodInfoForBarcodeRepository();
            BarcodeFromDataorkr rtnVal = repository.GetFoodInfoWithBarcode(id);

            if (rtnVal != null)
                return JsonConvert.SerializeObject(rtnVal);
            else
                return "";
        }

        // POST api/<controller>
        public string Post([FromBody]List<BarcodeFromDataorkr> value)
        {
            if (value == null)
                return "null!!";

            var repository = new FoodInfoForBarcodeRepository();
            int rtnVal = repository.CreateBarcodeInfo(value);

            if (rtnVal > 0)
                return rtnVal.ToString();
            else
                return "-1";
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}