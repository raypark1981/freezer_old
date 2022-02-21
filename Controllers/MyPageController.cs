using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace www.freezer.com.Controllers
{
    public class MyPageController : CommonController
    {
        // GET: MyPage
        public ActionResult Index()
        {
            return View();
        }
    }
}