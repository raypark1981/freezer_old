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
    public class UserSectionRepository
    {
        #region UserSection
        public int UpdateUserSection(string userKey, List<MyFreezer> _MyFreezer)
        {
            int iRet = 0;

            try
            {
                string FreezerKey = "";


                foreach (var freezer in _MyFreezer)
                {
                    FreezerKey = freezer.FreezerKey;

                    string SectionKeys = "";
                    string SectionNames = "";

                    foreach (var section in freezer.MySections)
                    {
                        SectionKeys += section.SectionKey + "^";
                        SectionNames += section.SectionName + "^";
                    }

                    DatabaseProviderFactory factory = new DatabaseProviderFactory();
                    Database db = factory.Create("FreezerConnection");
                    DbCommand dbComm = db.GetStoredProcCommand("dbo.proc_Update_userSection");

                    db.AddInParameter(dbComm, "UserKey", DbType.String, userKey);
                    db.AddInParameter(dbComm, "FreezerKey", DbType.String, FreezerKey);
                    db.AddInParameter(dbComm, "SectionKeys", DbType.String, SectionKeys);
                    db.AddInParameter(dbComm, "SectionNames", DbType.String, SectionNames);

                    iRet += db.ExecuteNonQuery(dbComm);
                }

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