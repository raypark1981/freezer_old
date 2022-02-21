using Freezer.Common.Models;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Web;

namespace www.freezer.com.Repository
{
    public class FoodInfoForBarcodeRepository
    {
        #region data.go.kr 에서 가져온 데이터 쓸지말지 고민
        public int CreateBarcodeInfo(List<BarcodeFromDataorkr> value)
        {
            int iRet = 0;
            try
            {
                foreach (BarcodeFromDataorkr item in value)
                {
                    DatabaseProviderFactory factory = new DatabaseProviderFactory();
                    Database db = factory.Create("FreezerConnection");
                    DbCommand dbComm = db.GetStoredProcCommand("dbo.proc_Create_BarcodeInfo");

                    db.AddInParameter(dbComm, "Allergy", DbType.String, item.Allergy);
                    db.AddInParameter(dbComm, "Barcode", DbType.String, item.Barcode);
                    db.AddInParameter(dbComm, "Capacity", DbType.String, item.Capacity);
                    db.AddInParameter(dbComm, "Imgurl1", DbType.String, item.Imgurl1);
                    db.AddInParameter(dbComm, "Imgurl2", DbType.String, item.Imgurl2);
                    db.AddInParameter(dbComm, "Manufacture", DbType.String, item.Manufacture);
                    db.AddInParameter(dbComm, "Nutrient", DbType.String, item.Nutrient);
                    db.AddInParameter(dbComm, "Prdkind", DbType.String, item.Prdkind);
                    db.AddInParameter(dbComm, "Prdkindstate", DbType.String, item.Prdkindstate);
                    db.AddInParameter(dbComm, "PrdlstNm", DbType.String, item.PrdlstNm);
                    db.AddInParameter(dbComm, "PrdlstReportNo", DbType.String, item.PrdlstReportNo);
                    db.AddInParameter(dbComm, "ProductGb", DbType.String, item.ProductGb);
                    db.AddInParameter(dbComm, "Rawmtrl", DbType.String, item.Rawmtrl);
                    db.AddInParameter(dbComm, "Seller", DbType.String, item.Seller);


                    iRet += db.ExecuteNonQuery(dbComm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return iRet;
        }

        internal BarcodeFromDataorkr GetFoodInfoWithBarcode(string id)
        {
            DatabaseProviderFactory factory = new DatabaseProviderFactory();
            Database db = factory.Create("FreezerConnection");
            DbCommand dbComm = db.GetStoredProcCommand("dbo.proc_Get_FoodInfoWithBarcode");

            db.AddInParameter(dbComm, "Barcode", DbType.String, id);
            DataSet ds = db.ExecuteDataSet(dbComm);
            if (ds.Tables.Count > 0)
            {
                BarcodeFromDataorkr foodInfoForBarcodeModel = (from row in ds.Tables[0].AsEnumerable()
                                                               select new BarcodeFromDataorkr()
                                                               {
                                                                   Allergy = row.Field<string>("Allergy"),
                                                                   Barcode = row.Field<string>("Barcode"),
                                                                   Capacity = row.Field<string>("Capacity"),
                                                                   Imgurl1 = row.Field<string>("Imgurl1"),
                                                                   Imgurl2 = row.Field<string>("Imgurl2"),
                                                                   Manufacture = row.Field<string>("Manufacture"),
                                                                   Nutrient = row.Field<string>("Nutrient"),
                                                                   Prdkind = row.Field<string>("Prdkind"),
                                                                   Prdkindstate = row.Field<string>("Prdkindstate"),
                                                                   PrdlstNm = row.Field<string>("PrdlstNm"),
                                                                   PrdlstReportNo = row.Field<string>("PrdlstReportNo"),
                                                                   ProductGb = row.Field<string>("ProductGb"),
                                                                   Rawmtrl = row.Field<string>("Rawmtrl"),
                                                                   Seller = row.Field<string>("Seller")
                                                               }).ToList().FirstOrDefault();

                return foodInfoForBarcodeModel;
            }
            else
                return null;

        }
        #endregion

        public bool SaveBarcodeFromkoreanet(BarcodeFromkoreanet item) {

            DatabaseProviderFactory factory = new DatabaseProviderFactory();
            Database db = factory.Create("FreezerConnection");
            DbCommand dbComm = db.GetStoredProcCommand("dbo.proc_Create_FoodInfoForBarcode");

            db.AddInParameter(dbComm, "Barcode", DbType.String, item.Barcode);
            db.AddInParameter(dbComm, "Title", DbType.String, item.Title);
            db.AddInParameter(dbComm, "Sellor", DbType.String, item.Sellor);
            db.AddInParameter(dbComm, "CompanyAddress", DbType.String, item.CompanyAddress);
            db.AddInParameter(dbComm, "CompanyPhone", DbType.String, item.CompanyPhone);
            db.AddInParameter(dbComm, "CompanySite", DbType.String, item.CompanySite);
            db.AddInParameter(dbComm, "Image1", DbType.String, item.ThumImages[0]);
            db.AddInParameter(dbComm, "Image2", DbType.String, item.ThumImages[1]);
            db.AddInParameter(dbComm, "Image3", DbType.String, item.ThumImages[2]);
            db.AddInParameter(dbComm, "Image4", DbType.String, item.ThumImages[3]);

            db.ExecuteNonQuery(dbComm);
            return true;
        }

        public BarcodeFromkoreanet getBarcodeFromkoreanet(string barcode)
        {

            DatabaseProviderFactory factory = new DatabaseProviderFactory();
            Database db = factory.Create("FreezerConnection");
            DbCommand dbComm = db.GetStoredProcCommand("dbo.proc_Get_FoodInfoForBarcode");

            Func<string[], List<string>> returnList = delegate (string[] array) {
                List<string> temp = new List<string>();
                for (int i = 0; i < array.Length; i++) {
                    temp.Add(array[i]);
                }
                return temp;
            };

            db.AddInParameter(dbComm, "Barcode", DbType.String, barcode);
            DataSet ds = db.ExecuteDataSet(dbComm);
            if (ds.Tables.Count > 0)
            {
                var returnData = (from row in ds.Tables[0].AsEnumerable()
                                  select new BarcodeFromkoreanet()
                                  {
                                      Barcode = row.Field<string>("Barcode"),
                                      Title = row.Field<string>("Title"),
                                      Sellor = row.Field<string>("Sellor"),
                                      CompanyAddress = row.Field<string>("CompanyAddress"),
                                      CompanyPhone = row.Field<string>("CompanyPhone"),
                                      CompanySite = row.Field<string>("CompanySite"),
                                      //ThumImages = returnList(new string[] { row.Field<string>("Image1"), row.Field<string>("Image2") , row.Field<string>("Image3") , row.Field<string>("Image4") })
                                      ThumImages = new string[] { row.Field<string>("Image1"), row.Field<string>("Image2"), row.Field<string>("Image3"), row.Field<string>("Image4") }.ToList<string>()
                                  }).SingleOrDefault();

                return returnData;
            }
            else {
                return new BarcodeFromkoreanet();
            }
        }
    }
}