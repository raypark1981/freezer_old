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
    public class RecipeSearchRepository
    {
        public FreezerRecipeIndex getHotResipeList()
        {
            FreezerRecipeIndex _FreezerRecipeIndex = null;
            List<RecipeIndex> _RecipeIndex_List = null;
            RecipeIndex _RecipeIndex = null;

            try
            {
                DatabaseProviderFactory factory = new DatabaseProviderFactory();
                Database db = factory.Create("FreezerConnection");
                DbCommand dbComm = db.GetStoredProcCommand("dbo.proc_Get_HotRecipeList");
                
                DataSet ds = db.ExecuteDataSet(dbComm);

                if(ds.Tables.Count > 0)
                {
                    _RecipeIndex_List = new List<RecipeIndex>();
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        _RecipeIndex = new RecipeIndex();
                        _RecipeIndex.RCP_SEQ = int.Parse(dr["RCP_SEQ"].ToString());
                        _RecipeIndex.DISP_RCP_NM = dr["RCP_NM"].ToString();
                        _RecipeIndex.RCP_WAY2 = dr["RCP_WAY2"].ToString();
                        _RecipeIndex.RCP_PAT2 = dr["RCP_PAT2"].ToString();
                        _RecipeIndex.HASH_TAG = dr["HASH_TAG"].ToString();
                        _RecipeIndex.ATT_FILE_NO_MAIN = dr["ATT_FILE_NO_MAIN"].ToString();

                        _RecipeIndex_List.Add(_RecipeIndex);
                    }

                    _FreezerRecipeIndex = new FreezerRecipeIndex();
                    _FreezerRecipeIndex.RecipeIndexlist = _RecipeIndex_List;
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }

            return _FreezerRecipeIndex;
        }
    }
}