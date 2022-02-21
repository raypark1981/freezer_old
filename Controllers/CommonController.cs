using Freezer.CustomAuthentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using System.Web.Security;

namespace www.freezer.com.Controllers
{
    public class CommonController : Controller
    {
        public CustomPrincipal CustomPrincipal { get; private set; }
        public CommonController() {

            if (System.Web.HttpContext.Current.User.Identity.IsAuthenticated)
            {
                CustomPrincipal = (CustomPrincipal)System.Web.HttpContext.Current.User;
            }

            ViewBag.IsDev = this.IsDev;
            ViewBag.IsLogin = this.IsLogin;

        }
        public bool IsLogin
        {
            get
            {
                return System.Web.HttpContext.Current.User.Identity.IsAuthenticated;
            }
        }
        public string UserEmail
        {
            get
            {
                return CustomPrincipal.Email;
            }
        }
        public string UserKey
        {
            get
            {
                try
                {
                    return CustomPrincipal.UserKey;
                }
                catch
                {
                    return string.Empty;
                }

            }
        }
        public string UserName
        {
            get
            {
                return CustomPrincipal.UserName;
            }
        }
        public string UserRoles
        {
            get
            {
                return CustomPrincipal.Roles;
            }
        }

        public bool IsDev {
            get {
                return false;
            }
        }
    }
}