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
    public class MyPageRepository
    {
        public Freezer_User getUserInfo(string userKey)
        {
            DataSet ds;
            Freezer_User _Freezer_User = null;

            try
            {
                DatabaseProviderFactory factory = new DatabaseProviderFactory();
                Database db = factory.Create("FreezerConnection");
                DbCommand dbComm = db.GetStoredProcCommand("dbo.proc_Get_Freezer_UserInfo");

                db.AddInParameter(dbComm, "UserKey", DbType.String, userKey);

                ds = db.ExecuteDataSet(dbComm);

                if(ds.Tables.Count > 0)
                {
                    DataTable dt = ds.Tables[0];
                    if (dt.Rows.Count > 0)
                    {
                        _Freezer_User = new Freezer_User();

                        _Freezer_User.UserName = dt.Rows[0]["UserName"].ToString();
                        _Freezer_User.Email = dt.Rows[0]["Email"].ToString();
                        _Freezer_User.LoginKeepYN = dt.Rows[0]["LoginKeepYN"].ToString();
                        _Freezer_User.AlarmYN = dt.Rows[0]["AlarmYN"].ToString();
                        _Freezer_User.UserGrade = dt.Rows[0]["UserGrade"].ToString();
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return _Freezer_User;
        }
    }
}