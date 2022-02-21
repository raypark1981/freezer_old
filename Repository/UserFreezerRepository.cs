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
    public class UserFreezerRepository
    {
        #region UserFreezer
        public int UpdateUserFreezer(string userKey, List<MyFreezer> _MyFreezer)
        {
            int iRet = 0;

            try
            {
                string FreezerKeys = "";
                string FreezerNames = "";
                string MainYns = "";

                foreach (var freezer in _MyFreezer)
                {
                    FreezerKeys += freezer.FreezerKey + "^";
                    FreezerNames += freezer.FreezerName + "^";
                    MainYns += freezer.MainYn + "^";
                }

                DatabaseProviderFactory factory = new DatabaseProviderFactory();
                Database db = factory.Create("FreezerConnection");
                DbCommand dbComm = db.GetStoredProcCommand("dbo.proc_Update_userFreezer");

                db.AddInParameter(dbComm, "UserKey", DbType.String, userKey);
                db.AddInParameter(dbComm, "FreezerKeys", DbType.String, FreezerKeys);
                db.AddInParameter(dbComm, "FreezerNames", DbType.String, FreezerNames);
                db.AddInParameter(dbComm, "MainYns", DbType.String, MainYns);

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