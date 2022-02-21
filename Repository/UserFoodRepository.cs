using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Data;
using System.Data.Common;
using Freezer.Models;


namespace Freezer.Repository
{
    public class UserFoodRepository
    {
        #region UserFood
        public int UpdateUserFood(List<MyFood> _MyFood)
        {
            int iRet = 0;

            try
            {
                string FoodKeys = "";
                string FoodNames = "";
                string InputDates = "";
                string ExpiredDates = "";
                string FoodDetails = "";
                string Memos = "";

                foreach (var food in _MyFood)
                {
                    FoodKeys += food.FoodKey + "^";
                    FoodNames += food.FoodName + "^";
                    InputDates += food.InputDate + "^";
                    ExpiredDates += food.ExpiredDate + "^";
                    FoodDetails += food.FoodDetail + "^";
                    Memos += food.Memo + "^";
                }

                DatabaseProviderFactory factory = new DatabaseProviderFactory();
                Database db = factory.Create("FreezerConnection");
                DbCommand dbComm = db.GetStoredProcCommand("dbo.proc_Update_userFood");

                db.AddInParameter(dbComm, "FoodKeys", DbType.String, FoodKeys);
                db.AddInParameter(dbComm, "FoodNames", DbType.String, FoodNames);
                db.AddInParameter(dbComm, "InputDates", DbType.String, InputDates);
                db.AddInParameter(dbComm, "ExpiredDates", DbType.String, ExpiredDates);
                db.AddInParameter(dbComm, "FoodDetails", DbType.String, FoodDetails);
                db.AddInParameter(dbComm, "Memos", DbType.String, Memos);

                iRet = db.ExecuteNonQuery(dbComm);

            }
            catch (Exception ex)
            {
                throw ex;
            }

            return iRet;
        }
        #endregion
    }
}