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
    public class RecipeRepository
    {
        #region Recipe
        public int CreateRecipe(FreezerRecipe value)
        {
            int iRet = 0;
            try
            {
                foreach (Recipe r in value.Recipes)
                {
                    DatabaseProviderFactory factory = new DatabaseProviderFactory();
                    Database db = factory.Create("FreezerConnection");
                    DbCommand dbComm = db.GetStoredProcCommand("dbo.proc_Create_Recipe");

                    db.AddInParameter(dbComm, "RCP_SEQ", DbType.Int32, r.RCP_SEQ);
                    db.AddInParameter(dbComm, "RCP_NM", DbType.String, r.RCP_NM);
                    db.AddInParameter(dbComm, "RCP_WAY2", DbType.String, r.RCP_WAY2);
                    db.AddInParameter(dbComm, "RCP_PAT2", DbType.String, r.RCP_PAT2);
                    db.AddInParameter(dbComm, "INFO_WGT", DbType.Decimal, r.INFO_WGT == "" ? 0 : decimal.Parse(r.INFO_WGT));
                    db.AddInParameter(dbComm, "INFO_ENG", DbType.Decimal, r.INFO_ENG == "" ? 0 : decimal.Parse(r.INFO_ENG));
                    db.AddInParameter(dbComm, "INFO_CAR", DbType.Decimal, r.INFO_CAR == "" ? 0 : decimal.Parse(r.INFO_CAR));
                    db.AddInParameter(dbComm, "INFO_PRO", DbType.Decimal, r.INFO_PRO == "" ? 0 : decimal.Parse(r.INFO_PRO));
                    db.AddInParameter(dbComm, "INFO_FAT", DbType.Decimal, r.INFO_FAT == "" ? 0 : decimal.Parse(r.INFO_FAT));
                    db.AddInParameter(dbComm, "INFO_NA", DbType.Decimal, r.INFO_NA == "" ? 0 : decimal.Parse(r.INFO_NA));
                    db.AddInParameter(dbComm, "HASH_TAG", DbType.String, r.HASH_TAG);
                    db.AddInParameter(dbComm, "ATT_FILE_NO_MAIN", DbType.String, r.ATT_FILE_NO_MAIN);
                    db.AddInParameter(dbComm, "ATT_FILE_NO_MK", DbType.String, r.ATT_FILE_NO_MK);
                    db.AddInParameter(dbComm, "RCP_PARTS_DTLS", DbType.String, r.RCP_PARTS_DTLS);
                    db.AddInParameter(dbComm, "MANUAL01", DbType.String, r.MANUAL01);
                    db.AddInParameter(dbComm, "MANUAL_IMG01", DbType.String, r.MANUAL_IMG01);
                    db.AddInParameter(dbComm, "MANUAL02", DbType.String, r.MANUAL02);
                    db.AddInParameter(dbComm, "MANUAL_IMG02", DbType.String, r.MANUAL_IMG02);
                    db.AddInParameter(dbComm, "MANUAL03", DbType.String, r.MANUAL03);
                    db.AddInParameter(dbComm, "MANUAL_IMG03", DbType.String, r.MANUAL_IMG03);
                    db.AddInParameter(dbComm, "MANUAL04", DbType.String, r.MANUAL04);
                    db.AddInParameter(dbComm, "MANUAL_IMG04", DbType.String, r.MANUAL_IMG04);
                    db.AddInParameter(dbComm, "MANUAL05", DbType.String, r.MANUAL05);
                    db.AddInParameter(dbComm, "MANUAL_IMG05", DbType.String, r.MANUAL_IMG05);
                    db.AddInParameter(dbComm, "MANUAL06", DbType.String, r.MANUAL06);
                    db.AddInParameter(dbComm, "MANUAL_IMG06", DbType.String, r.MANUAL_IMG06);
                    db.AddInParameter(dbComm, "MANUAL07", DbType.String, r.MANUAL07);
                    db.AddInParameter(dbComm, "MANUAL_IMG07", DbType.String, r.MANUAL_IMG07);
                    db.AddInParameter(dbComm, "MANUAL08", DbType.String, r.MANUAL08);
                    db.AddInParameter(dbComm, "MANUAL_IMG08", DbType.String, r.MANUAL_IMG08);
                    db.AddInParameter(dbComm, "MANUAL09", DbType.String, r.MANUAL09);
                    db.AddInParameter(dbComm, "MANUAL_IMG09", DbType.String, r.MANUAL_IMG09);
                    db.AddInParameter(dbComm, "MANUAL10", DbType.String, r.MANUAL10);
                    db.AddInParameter(dbComm, "MANUAL_IMG10", DbType.String, r.MANUAL_IMG10);
                    db.AddInParameter(dbComm, "MANUAL11", DbType.String, r.MANUAL11);
                    db.AddInParameter(dbComm, "MANUAL_IMG11", DbType.String, r.MANUAL_IMG11);
                    db.AddInParameter(dbComm, "MANUAL12", DbType.String, r.MANUAL12);
                    db.AddInParameter(dbComm, "MANUAL_IMG12", DbType.String, r.MANUAL_IMG12);
                    db.AddInParameter(dbComm, "MANUAL13", DbType.String, r.MANUAL13);
                    db.AddInParameter(dbComm, "MANUAL_IMG13", DbType.String, r.MANUAL_IMG13);
                    db.AddInParameter(dbComm, "MANUAL14", DbType.String, r.MANUAL14);
                    db.AddInParameter(dbComm, "MANUAL_IMG14", DbType.String, r.MANUAL_IMG14);
                    db.AddInParameter(dbComm, "MANUAL15", DbType.String, r.MANUAL15);
                    db.AddInParameter(dbComm, "MANUAL_IMG15", DbType.String, r.MANUAL_IMG15);
                    db.AddInParameter(dbComm, "MANUAL16", DbType.String, r.MANUAL16);
                    db.AddInParameter(dbComm, "MANUAL_IMG16", DbType.String, r.MANUAL_IMG16);
                    db.AddInParameter(dbComm, "MANUAL17", DbType.String, r.MANUAL17);
                    db.AddInParameter(dbComm, "MANUAL_IMG17", DbType.String, r.MANUAL_IMG17);
                    db.AddInParameter(dbComm, "MANUAL18", DbType.String, r.MANUAL18);
                    db.AddInParameter(dbComm, "MANUAL_IMG18", DbType.String, r.MANUAL_IMG18);
                    db.AddInParameter(dbComm, "MANUAL19", DbType.String, r.MANUAL19);
                    db.AddInParameter(dbComm, "MANUAL_IMG19", DbType.String, r.MANUAL_IMG19);
                    db.AddInParameter(dbComm, "MANUAL20", DbType.String, r.MANUAL20);
                    db.AddInParameter(dbComm, "MANUAL_IMG20", DbType.String, r.MANUAL_IMG20);


                    iRet += db.ExecuteNonQuery(dbComm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return iRet;

        }

        public DisplayRecipe getRecipeBySeq(int req_seq)
        {
            DisplayRecipe _Recipe = null;
            Ingrident _Ingrident = null;
            Manual _Manual = null;
            List<Manual> _Manuals = null;

            try
            {
                DatabaseProviderFactory factory = new DatabaseProviderFactory();
                Database db = factory.Create("FreezerConnection");
                DbCommand dbComm = db.GetStoredProcCommand("dbo.proc_Get_Recipe");

                db.AddInParameter(dbComm, "RCP_SEQ", DbType.Int32, req_seq);

                DataSet ds = db.ExecuteDataSet(dbComm);

                if(ds.Tables.Count > 0)
                {
                    foreach(DataRow dr in ds.Tables[0].Rows)
                    {
                        _Recipe = new DisplayRecipe();
                        _Ingrident = new Ingrident();
                        _Manuals = new List<Manual>();

                        _Recipe.RCP_SEQ = dr["RCP_SEQ"].ToString();
                        _Recipe.RCP_NM= dr["RCP_NM"].ToString();
                        _Recipe.RCP_WAY2= dr["RCP_WAY2"].ToString();
                        _Recipe.RCP_WAY2_Code = dr["RCP_WAY2_Code"].ToString();
                        _Recipe.RCP_PAT2= dr["RCP_PAT2"].ToString();
                        _Recipe.RCP_PAT2_Code = dr["RCP_PAT2_Code"].ToString();

                        //0.000 인경우, 1인분으로 치환
                        _Recipe.INFO_WGT= dr["INFO_WGT"].ToString() == "0.000" ? "1인분" : dr["INFO_WGT"].ToString();
                        _Recipe.INFO_ENG= dr["INFO_ENG"].ToString();
                        _Recipe.INFO_CAR= dr["INFO_CAR"].ToString();
                        _Recipe.INFO_PRO= dr["INFO_PRO"].ToString();
                        _Recipe.INFO_FAT= dr["INFO_FAT"].ToString();
                        _Recipe.INFO_NA= dr["INFO_NA"].ToString();
                        _Recipe.HASH_TAG= dr["HASH_TAG"].ToString();
                        _Recipe.ATT_FILE_NO_MAIN = dr["ATT_FILE_NO_MAIN"].ToString();
                        _Recipe.ATT_FILE_NO_MK= dr["ATT_FILE_NO_MK"].ToString();

                        //재료명은 치환

                        _Recipe.RCP_PARTS_DTLS = dr["RCP_PARTS_DTLS"].ToString();
                        //string CONVERT_RCP_PARTS_DTLS_HTML = convertIngredient(dr["RCP_PARTS_DTLS"].ToString());
                        //
                        for (int i = 1; i <= 20; i++){
                            string idx = i.ToString().Length == 1 ? "0" + i.ToString() : i.ToString();

                            _Manual = new Manual();
                            _Manual.MANUAL_DESC = convertManual(dr["MANUAL"  + idx].ToString());
                            _Manual.MANUAL_IMG = dr["MANUAL_IMG" + idx].ToString();

                            _Manuals.Add(_Manual);
                        }

                        _Recipe.MANUALS = _Manuals;
                    }
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }

            return _Recipe;
        }

        private string convertManual(string strTarget)
        {
            //예외처리
            if (strTarget.Length == 0)
                return "";

            string retStr = strTarget;

            try
            {
                //엔터값은 모두 제거
                strTarget = strTarget.Replace("\n", "");

                //만약, 마지막. 이후로 영문자가 들어가 있다면, 이것은 모두 제외 
                //indexof +1 == Length
                if (strTarget.LastIndexOf('.') + 1 != strTarget.Length)
                {
                    string cutStr = strTarget.Substring(strTarget.LastIndexOf('.'));
                    strTarget = strTarget.Replace(cutStr, ".");
                }

                retStr = strTarget;

            }
            catch(Exception ex)
            {
                throw ex;
            }

            return retStr;
        }

        private string convertIngredient(string strTarget)
        {
            string retStr = strTarget;

            try
            {
                //":" OR " : " 값이 있다면, 
                if(strTarget.IndexOf(":") > 0)
                {
                    if(strTarget.IndexOf(" : ") > 0)
                    {
                        strTarget = strTarget.Replace(" : ", "\n");
                    }
                    else
                    {
                        strTarget = strTarget.Replace(":", "\n");
                    }
                }

                //포기!!! 이건 나중에 시간 되면 
                ////엔터값이 있기 전까지는 모두 타이틀
                //string Start_pTag = "<p>";
                //string End_pTag = "</p>";
                string html = "<p>";
                string word = "";

                Ingrident _Ingrident = null;
                List<Ingrident> _Ingridents = null;


                while (strTarget.Length > 0)
                {
                    int iEnter = strTarget.IndexOf("\n");
                    int iElse = strTarget.IndexOf(",");

                    if (iEnter < iElse)
                    {
                        //만약 엔터값이 나타났다면, 다음 엔터값 전까지 잘라서 title로!
                        _Ingrident = new Ingrident();
                        word = strTarget.Substring(0, iEnter);
                        _Ingrident.TITLE = word;

                        //title 잘린 문자열
                        strTarget = strTarget.Substring(iEnter);
                        
                        //다음 엔터값 전까지

                    }
                    else
                    {

                    }
                }

                ////", " 값이 있다면, 그건 재료! 

                //", " 값은 모두 엔터값으로 치환
                strTarget = strTarget.Replace(", ", "\n");

                retStr = strTarget;

            }
            catch (Exception ex)
            {
                throw ex;
            }

            return retStr;
        }

        public int increaseViewCount(int RCP_SEQ)
        {
            int iRet = 0;
            DataSet ds = null;
            try
            {
                DatabaseProviderFactory factory = new DatabaseProviderFactory();
                Database db = factory.Create("FreezerConnection");
                DbCommand dbComm = db.GetStoredProcCommand("dbo.proc_Update_RecipeViewCount");

                db.AddInParameter(dbComm, "RCP_SEQ", DbType.Int32, RCP_SEQ);

                ds = db.ExecuteDataSet(dbComm);

                if(ds.Tables.Count > 0)
                {
                    iRet = int.Parse(ds.Tables[0].Rows[0]["ViewCnt"].ToString());
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