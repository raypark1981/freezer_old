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
    public class FreezerRepository
    {
        #region Food
        public int CreateFoodMaster(FreezerFood value)
        {
            int iRet = 0;
            try
            {
                foreach (Food f in value.Foods)
                {
                    DatabaseProviderFactory factory = new DatabaseProviderFactory();
                    Database db = factory.Create("FreezerConnection");
                    DbCommand dbComm = db.GetStoredProcCommand("dbo.proc_Create_FoodMaster");

                    db.AddInParameter(dbComm, "FOOD_CD", DbType.String, f.FOOD_CD);
                    db.AddInParameter(dbComm, "FDGRP_NM", DbType.String, f.FDGRP_NM);
                    db.AddInParameter(dbComm, "DESC_KOR", DbType.String, f.DESC_KOR);
                    db.AddInParameter(dbComm, "SERVING_WT", DbType.Double, f.SERVING_WT);
                    db.AddInParameter(dbComm, "ANIMAL_PLANT", DbType.String, f.ANIMAL_PLANT);
                    db.AddInParameter(dbComm, "NUTR_CONT1", DbType.Double, f.NUTR_CONT1);
                    db.AddInParameter(dbComm, "NUTR_CONT2", DbType.Double, f.NUTR_CONT2);
                    db.AddInParameter(dbComm, "NUTR_CONT3", DbType.Double, f.NUTR_CONT3);
                    db.AddInParameter(dbComm, "NUTR_CONT4", DbType.Double, f.NUTR_CONT4);
                    db.AddInParameter(dbComm, "NUTR_CONT5", DbType.Double, f.NUTR_CONT5);
                    db.AddInParameter(dbComm, "NUTR_CONT6", DbType.Double, f.NUTR_CONT6);
                    db.AddInParameter(dbComm, "NUTR_CONT7", DbType.Double, f.NUTR_CONT7);
                    db.AddInParameter(dbComm, "NUTR_CONT8", DbType.Double, f.NUTR_CONT8);
                    db.AddInParameter(dbComm, "NUTR_CONT9", DbType.Double, f.NUTR_CONT9);

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