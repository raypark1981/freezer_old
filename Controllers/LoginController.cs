using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Threading.Tasks;
using Freezer.Models;
using Freezer.CustomAuthentication;
using Newtonsoft.Json;
using System.Net;
using System.Net.Mail;
using System.Web.Security;
using System.Text;
using System.Web.Script.Serialization;
using System.Net.Http;

namespace www.freezer.com.Controllers
{
    [Authorize]
    public class LoginController : Controller
    {
        public LoginController()
        {
        }

        // Index: Freezer
        [AllowAnonymous]
        public ActionResult Index(string type = "", string errMsg = "")
        {
            if(string.IsNullOrEmpty(type) && string.IsNullOrEmpty(errMsg))
            {
                if(HttpContext.Request.Cookies[FormsAuthentication.FormsCookieName] != null)
                {
                    string userEMail = ((CustomPrincipal)HttpContext.User).Email;
                    var user = (CustomMemberShipUser)Membership.GetUser(userEMail, false);
                    //자동로그인
                    if(user != null)
                    {
                        if (user.LoginKeepYN.Equals("Y"))
                        {
                            return RedirectToAction("Index", "FoodList");
                        }
                    }
                }
            }

            ViewBag.errMsg = errMsg;
            ViewBag.type = type;

            return View();
        }

        public string LogOut()
        {
            HttpCookie cookie = new HttpCookie(FormsAuthentication.FormsCookieName, "");
            cookie.Expires = DateTime.Now.AddYears(-1);
            Response.Cookies.Add(cookie);

            FormsAuthentication.SignOut();
            
            var jsonStr = "{\"logout\": \"ok\"}";
            return jsonStr;

        }

        // POST: /Account/Register
        [HttpPost]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public ActionResult Register(string sign_firstName, string sign_lastName, string sign_email, string sign_password, string sign_facebookId)
        {
            string type = "";
            string errMsg = "";

            if (ModelState.IsValid)
            {
                // Email Verification  
                string userName = Membership.GetUserNameByEmail(sign_email);
                if (!string.IsNullOrEmpty(userName))
                {
                    errMsg = "Sorry: Email already Exists";
                    type = "sign";
                    return RedirectToAction("Index", new { type = type, errMsg = errMsg });
                }
                else
                {
                    userName = sign_firstName + sign_lastName;
                }
                
                //Save User Data   
                using (AuthenticationDB dbContext = new AuthenticationDB())
                {
                    Encrypt encrypt = new Encrypt();
                    var user = new Freezer_User()
                    {
                        UserKey = dbContext.GetNewUserKey(),
                        UserName = userName,
                        Email = sign_email,
                        FacebookId = sign_facebookId,
                        Password = encrypt.AESEncrypt256(sign_password),
                        isUse = "Y",
                        RoleId = "guest",
                        UserGrade = "GENR",
                        LoginKeepYN = "N",
                        AlarmYN = "N"
                    };

                    dbContext.Users.Add(user);
                    dbContext.SaveChanges();
                }

                type = "complete";
            }
            else
            {
                errMsg = "Something Wrong!";
                type = "sign";
            }

            return RedirectToAction("Index", new { type = type, errMsg = errMsg });
        }

        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public ActionResult Login(string login_email, string login_password, string login_chkLoginKeep)
        {
            string type = "";
            string errMsg = "";

            if (ModelState.IsValid)
            {
                Encrypt encrypt = new Encrypt();
                string encryptPassword = encrypt.AESEncrypt256(login_password);
                if (Membership.ValidateUser(login_email, encryptPassword))
                {
                    var user = (CustomMemberShipUser)Membership.GetUser(login_email, false);
                    if (user != null)
                    {
                        CustomSerializeModel userModel = new CustomSerializeModel()
                        {
                            UserKey = user.UserKey,
                            UserName = user.UserName,
                            RoleName = StringEnum.GetStringValue(user.RoleId),
                            Email = user.EMail,
                            LoginKeepYN = user.LoginKeepYN,
                            UserGrade = user.UserGrade

                        };

                        string userData = JsonConvert.SerializeObject(userModel);
                        FormsAuthenticationTicket authTicket = new FormsAuthenticationTicket
                        (
                            1, login_email, DateTime.Now, DateTime.Now.AddYears(1), false, userData
                        );

                        string enTicket = FormsAuthentication.Encrypt(authTicket);
                        HttpCookie faCookie = new HttpCookie(FormsAuthentication.FormsCookieName, enTicket);
                        Response.Cookies.Add(faCookie);

                        //자동로그인 여부 확인 및 업데이트 
                        string strChkLoginKeep = login_chkLoginKeep.Equals("on") ? "Y" : "N";
                        if (!user.LoginKeepYN.ToString().Equals(strChkLoginKeep))
                        {
                            user.LoginKeepYN = strChkLoginKeep;
                            Membership.UpdateUser(user);
                        }
                    }

                    return RedirectToAction("Index", "FoodList");
                }
            }

            errMsg = "Something Wrong : Username or Password invalid";
            type = "login";
            return RedirectToAction("Index", new { type = type, errMsg = errMsg });
        }
    }
}