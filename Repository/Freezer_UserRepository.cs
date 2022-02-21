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
    public class Freezer_UserRepository
    {
        #region Freezer_User
        public int CreateUserFreezer(MyFreezer value, string userKey)
        {
            int iRet = 0;

            try
            {

                DatabaseProviderFactory factory = new DatabaseProviderFactory();
                Database db = factory.Create("FreezerConnection");
                DbCommand dbComm = db.GetStoredProcCommand("dbo.proc_Create_userFreezer");

                db.AddInParameter(dbComm, "UserKey", DbType.String, userKey);
                db.AddInParameter(dbComm, "FreezerName", DbType.String, value.FreezerName);

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