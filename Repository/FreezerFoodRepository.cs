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
    public class FreezerFoodRepository
    {
        #region FreezerFood
        public MyFreezerFood getFreezerFoodByKey(string userKey, string freezerKey)
        {
            DataSet ds;
            MyFreezerFood _FreezerFoodList = null;
            List<MyFreezer> _FreezerList = null;
            MyFreezer _Freezer = null;
            List<MySection> _SectionList = null;
            MySection _Section = null;
            List<MyFood> _FoodList = null;
            MyFood _Food = null;

            try
            {
                DatabaseProviderFactory factory = new DatabaseProviderFactory();
                Database db = factory.Create("FreezerConnection");
                DbCommand dbComm = db.GetStoredProcCommand("dbo.proc_Get_FreezerFoodByKey");

                db.AddInParameter(dbComm, "UserKey", DbType.String, userKey);
                db.AddInParameter(dbComm, "FreezerKey", DbType.String, freezerKey);

                ds = db.ExecuteDataSet(dbComm);
                DataTable dt = ds.Tables[0];

                if (ds.Tables.Count > 0)
                {
                    _FreezerFoodList = new MyFreezerFood();
                    _FreezerList = new List<MyFreezer>();

                    var myFreezer = from r in ds.Tables[0].AsEnumerable()
                                    group r by r.Field<string>("FreezerKey") into FreezerGrp
                                    let row = FreezerGrp.First()
                                    select new
                                    {
                                        FreezerKey = row.Field<string>("FreezerKey"),
                                        FreezerName = row.Field<string>("FreezerName"),
                                        MainYn = row.Field<string>("MainYn")
                                    };


                    foreach (var obj in myFreezer)
                    {
                        _Freezer = new MyFreezer() { FreezerKey = obj.FreezerKey, FreezerName = obj.FreezerName, MainYn = obj.MainYn };
                        _FreezerList.Add(_Freezer);
                    }

                    for (int i = 0; i < _FreezerList.Count; i++)
                    {
                        _SectionList = new List<MySection>();

                        string strFreezerKey = _FreezerList[i].FreezerKey.ToString();

                        var mySection = from r in ds.Tables[0].AsEnumerable()
                                            //where r.Field<string>("FreezerKey") == strFreezerKey
                                            //group r by r.Field<string>("SectionKey") into SectionGrp
                                        where r.Field<string>("FreezerKey") == strFreezerKey
                                        group r by new
                                        {
                                            SectionKey = r.Field<string>("SectionKey"),
                                            SectionName = r.Field<string>("SectionName")
                                        } into SectionGrp
                                        select new
                                        {
                                            SectionKey = SectionGrp.Key.SectionKey,
                                            SectionName = SectionGrp.Key.SectionName

                                        };


                        foreach (var obj in mySection)
                        {
                            _Section = new MySection() { SectionKey = obj.SectionKey, SectionName = obj.SectionName };
                            _SectionList.Add(_Section);
                        }

                        _FreezerList[i].MySections = _SectionList;
                    }

                    for (int i = 0; i < _FreezerList.Count; i++)
                    {
                        string strFreezerKey = _FreezerList[i].FreezerKey.ToString();
                        for (int j = 0; j < _SectionList.Count; j++)
                        {
                            _FoodList = new List<MyFood>();

                            string strSectionKey = _SectionList[j].SectionKey.ToString();
                            var myFood = from r in ds.Tables[0].AsEnumerable()
                                         where r.Field<string>("FreezerKey") == strFreezerKey &&
                                                r.Field<string>("SectionKey") == strSectionKey
                                         select new
                                         {
                                             FoodKey = r.Field<int>("FoodKey"),
                                             Food_CD = r.Field<string>("Food_CD"),
                                             FoodName = r.Field<string>("FoodName"),
                                             FoodGrp = r.Field<string>("FoodGrp"),
                                             InputDate = r.Field<string>("InputDate"),
                                             ExpiredDate = r.Field<string>("ExpiredDate"),
                                             FoodDetail = r.Field<string>("FoodDetail"),
                                             Memo = r.Field<string>("Memo")
                                         };

                            foreach (var obj in myFood)
                            {
                                _Food = new MyFood()
                                {
                                    FoodKey = obj.FoodKey,
                                    Food_CD = obj.Food_CD,
                                    FoodName = obj.FoodName,
                                    FoodGrp = obj.FoodGrp,
                                    InputDate = obj.InputDate,
                                    ExpiredDate = obj.ExpiredDate,
                                    FoodDetail = obj.FoodDetail,
                                    Memo = obj.Memo
                                };

                                _FoodList.Add(_Food);
                            }

                            _SectionList[j].MyFoods = _FoodList;
                        }
                    }

                    _FreezerFoodList.MyFreezers = _FreezerList;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return _FreezerFoodList;
        }

        public int updateFreezerFoodByKey(string userKey, MyFreezerFood value)
        {
            int iRet = 0;

            try
            {
                UserFreezerRepository _UserFreezerRepository = new UserFreezerRepository();
                //Freezer update
                var _MyFreezer = value.MyFreezers;
                iRet = _UserFreezerRepository.UpdateUserFreezer(userKey, _MyFreezer);

                if (iRet < 1) return iRet;

                UserSectionRepository _UserSectionRepository = new UserSectionRepository();
                //Section update
                var _MySection = from freezer in value.MyFreezers
                                 select freezer.MySections;

                iRet = _UserSectionRepository.UpdateUserSection(userKey, _MyFreezer);
                if (iRet < 1) return 0;


                UserFoodRepository _UserFoodRepository = new UserFoodRepository();
                //Food update
                var _MyFoods = from section in _MySection.FirstOrDefault()
                               select section.MyFoods;

                iRet = _UserFoodRepository.UpdateUserFood((List<MyFood>)_MyFoods);
                if (iRet < 1) return iRet;


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