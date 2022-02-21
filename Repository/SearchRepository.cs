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
    public class SearchRepository
    {
        #region Search
        public FreezerRecipeIndex getRecipeIndexInfo(int rowsPerPage, int pageNumber)
        {
            DataSet ds = null;
            FreezerRecipeIndex _FreezerRecipeIndex = null;
            List<RecipeIndex> _RecipeIndexList = null;
            RecipeIndex _RecipeIndex = null;
            try
            {
                DatabaseProviderFactory factory = new DatabaseProviderFactory();
                Database db = factory.Create("FreezerConnection");
                DbCommand dbComm = db.GetStoredProcCommand("dbo.proc_Get_RecipeIndexInfo");

                db.AddInParameter(dbComm, "RowsPerPage", DbType.String, rowsPerPage);
                db.AddInParameter(dbComm, "PageNumber", DbType.String, pageNumber);

                ds = db.ExecuteDataSet(dbComm);
                DataTable dt = ds.Tables[0];

                if (ds.Tables.Count > 0)
                {
                    _FreezerRecipeIndex = new FreezerRecipeIndex();
                    _RecipeIndexList = new List<RecipeIndex>();

                    var recipeIndex = from r in ds.Tables[0].AsEnumerable()
                                      select new
                                      {
                                          RCP_SEQ = r.Field<int>("RCP_SEQ"),
                                          RCP_NM = r.Field<string>("RCP_NM"),
                                          DISP_RCP_NM = r.Field<string>("DISP_RCP_NM"),
                                          RCP_WAY2 = r.Field<string>("RCP_WAY2"),
                                          RCP_PAT2 = r.Field<string>("RCP_PAT2"),
                                          HASH_TAG = r.Field<string>("HASH_TAG"),
                                          ATT_FILE_NO_MAIN = r.Field<string>("ATT_FILE_NO_MAIN"),
                                          INGREDIENT = r.Field<string>("INGREDIENT")
                                      };


                    foreach (var obj in recipeIndex)
                    {
                        _RecipeIndex = new RecipeIndex() { RCP_SEQ = obj.RCP_SEQ, RCP_NM = obj.RCP_NM, DISP_RCP_NM = obj.DISP_RCP_NM, RCP_WAY2 = obj.RCP_WAY2, RCP_PAT2 = obj.RCP_PAT2, HASH_TAG = obj.HASH_TAG, ATT_FILE_NO_MAIN = obj.ATT_FILE_NO_MAIN, INGREDIENT = obj.INGREDIENT };
                        _RecipeIndexList.Add(_RecipeIndex);
                    }
                }

                _FreezerRecipeIndex.RecipeIndexlist = _RecipeIndexList;
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return _FreezerRecipeIndex;
        }

        public FreezerSearchIndex getFoodIndexInfo(int rowsPerPage, int pageNumber)
        {
            DataSet ds = null;
            FreezerSearchIndex _FreezerSearchIndex = null;
            List<SearchIndex> _SearchIndexList = null;
            SearchIndex _SearchIndex = null;
            try
            {
                DatabaseProviderFactory factory = new DatabaseProviderFactory();
                Database db = factory.Create("FreezerConnection");
                DbCommand dbComm = db.GetStoredProcCommand("dbo.proc_Get_FoodIndexInfo");

                db.AddInParameter(dbComm, "RowsPerPage", DbType.String, rowsPerPage);
                db.AddInParameter(dbComm, "PageNumber", DbType.String, pageNumber);

                ds = db.ExecuteDataSet(dbComm);
                DataTable dt = ds.Tables[0];

                if (ds.Tables.Count > 0)
                {
                    _FreezerSearchIndex = new FreezerSearchIndex();
                    _SearchIndexList = new List<SearchIndex>();

                    var searchIndex = from r in ds.Tables[0].AsEnumerable()
                                      select new
                                      {
                                          FOOD_CD = r.Field<string>("FOOD_CD"),
                                          DESC_KOR = r.Field<string>("DESC_KOR"),
                                          INDEXWORD = r.Field<string>("INDEXWORD"),
                                          FoodGrpName = r.Field<string>("FoodGrpName"),
                                          FoodGrpCode = r.Field<string>("FoodGrpCode"),
                                          MasterCode = r.Field<string>("MasterCode")
                                      };


                    foreach (var obj in searchIndex)
                    {
                        _SearchIndex = new SearchIndex() { FOOD_CD = obj.FOOD_CD, DESC_KOR = obj.DESC_KOR, INDEXWORD = obj.INDEXWORD, FoodGrpName = obj.FoodGrpName, FoodGrpCode = obj.FoodGrpCode, MasterCode = obj.MasterCode };
                        _SearchIndexList.Add(_SearchIndex);
                    }
                }

                _FreezerSearchIndex.SearchIndexlist = _SearchIndexList;
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return _FreezerSearchIndex;
        }
        #endregion
    }
}