using Freezer.Common.Models;
using HtmlAgilityPack;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Web.Http;
using www.freezer.com.Repository;

namespace www.freezer.com.Controllers.API
{
    public class BarcodeFromkoreanetController : ApiController
    {
        // GET: api/BarcodeFromkoreanet
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        /// <summary>
        /// http://foodkiper.com/api/BarcodeFromkoreanet/8809022200175
        /// http://www.freezer.com/api/BarcodeFromkoreanet/8809022200175
        /// </summary>
        /// <param name="barcode"></param>
        /// <returns></returns>
        /// GET: api/BarcodeFromkoreanet/8809022200175
        public JObject Get(string id)
        {

            JObject returnObj = new JObject();
            //JObject resultObj = new JObject();

            BarcodeFromkoreanet food = GetBarcodeFromkoreanet(id); 

            if (food == null)
            {

                string url = string.Format("http://www.koreannet.or.kr/home/hpisSrchGtin.gs1?gtin={0}", id);
                HttpWebRequest wReq = (HttpWebRequest)WebRequest.Create(url);
                wReq.Method = "GET";

                HttpWebResponse wRes = (HttpWebResponse)wReq.GetResponse();


                Stream respStream = wRes.GetResponseStream();
                StreamReader reader = new StreamReader(respStream, Encoding.GetEncoding(wRes.CharacterSet));

                string resultHtml = reader.ReadToEnd();

                ///  문서
                /////https://html-agility-pack.net/online-examples

                HtmlDocument doc = new HtmlDocument();
                doc.LoadHtml(resultHtml);

                HtmlNode nodeTitle = doc.DocumentNode.SelectSingleNode("//div[@class='productTit']");


                if (nodeTitle != null)
                {
                    var resultTitle = nodeTitle.InnerText.Replace("\r\n\t\t\t\t\t" , "").Replace("&nbsp;&nbsp;&nbsp;&nbsp;", "|").Split('|');

                    HtmlNode thumImg1 = doc.DocumentNode.SelectSingleNode("//img[@id='thumImg1']");
                    HtmlNode thumImg2 = doc.DocumentNode.SelectSingleNode("//img[@id='thumImg2']");
                    HtmlNode thumImg3 = doc.DocumentNode.SelectSingleNode("//img[@id='thumImg3']");
                    HtmlNode thumImg4 = doc.DocumentNode.SelectSingleNode("//img[@id='thumImg4']");

                    List<string> images = new List<string>();
                    string sthumImg1 = thumImg1.Attributes["src"].Value.Trim();
                    string sthumImg2 = thumImg2.Attributes["src"].Value.Trim();
                    string sthumImg3 = thumImg3.Attributes["src"].Value.Trim();
                    string sthumImg4 = thumImg4.Attributes["src"].Value.Trim();

                    if (!string.IsNullOrEmpty(sthumImg1))
                        images.Add(sthumImg1);
                    if (!string.IsNullOrEmpty(sthumImg2))
                        images.Add(sthumImg2);
                    if (!string.IsNullOrEmpty(sthumImg3))
                        images.Add(sthumImg3);
                    if (!string.IsNullOrEmpty(sthumImg4))
                        images.Add(sthumImg4);

                    var nodeInfos = doc.DocumentNode.SelectNodes("//dd[@class='lis']");
                    List<string> listInfo = new List<string>();

                    foreach (var item in nodeInfos)
                    {
                        listInfo.Add(item.InnerText);
                    }

                    string sellor = listInfo[3];
                    string companyAddress = listInfo[4];
                    string companyPhone = listInfo[5];
                    string companySite = listInfo[6];

                    BarcodeFromkoreanet _temp = new BarcodeFromkoreanet()
                    {
                        Barcode = resultTitle[0],
                        Title = resultTitle[1],
                        Sellor = sellor,
                        CompanyAddress = companyAddress,
                        CompanyPhone = companyPhone,
                        CompanySite = companySite,
                        ThumImages = images,
                    };

                    FoodInfoForBarcodeRepository foodInfoForBarcodeRepository = new FoodInfoForBarcodeRepository();
                    foodInfoForBarcodeRepository.SaveBarcodeFromkoreanet(_temp);

                    //JProperty propBarcode = new JProperty("barcode", resultTitle[0]);
                    //JProperty propTitle = new JProperty("title", resultTitle[1]);
                    //JProperty propSellor = new JProperty("sellor", sellor);
                    //JProperty propCompanyAddress = new JProperty("companyAddress", companyAddress);
                    //JProperty propCompnayPhone = new JProperty("companyPhone", companyPhone);
                    //JProperty propCompnaySite = new JProperty("companySite", companySite);
                    //JProperty propThumImg1 = new JProperty("thumImages", images);

                    //resultObj.Add(propBarcode);
                    //resultObj.Add(propTitle);
                    //resultObj.Add(propSellor);
                    //resultObj.Add(propCompanyAddress);
                    //resultObj.Add(propCompnayPhone);
                    //resultObj.Add(propCompnaySite);
                    //resultObj.Add(propThumImg1);

                    returnObj.Add(new JProperty("result", JObject.FromObject(_temp)));
                }
                else
                {
                    returnObj.Add(new JProperty("result", "No Data"));
                }
            }
            else {
                returnObj.Add(new JProperty("result", JObject.FromObject(food)));
            }

            return returnObj;
        }

        public BarcodeFromkoreanet GetBarcodeFromkoreanet(string barcode) {
            FoodInfoForBarcodeRepository foodInfoForBarcodeRepository = new FoodInfoForBarcodeRepository();
            BarcodeFromkoreanet food = foodInfoForBarcodeRepository.getBarcodeFromkoreanet(barcode);
            return food;
        }

        // POST: api/BarcodeFromkoreanet
        public void Post([FromBody]object value)
        {
            //http://www.koreannet.or.kr/home/hpisSrchGtin.gs1?gtin=8809022200175
        }

        // PUT: api/BarcodeFromkoreanet/5
        public void Put(int id, [FromBody]string value)
        {

        }

        // DELETE: api/BarcodeFromkoreanet/5
        public void Delete(int id)
        {
        }
    }
}
