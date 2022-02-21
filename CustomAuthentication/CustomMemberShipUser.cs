using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using Freezer.Models;

namespace Freezer.CustomAuthentication
{
    public class CustomMemberShipUser : MembershipUser
    {
        public string UserKey { get; set; }
        public string EMail { get; set; }
        public string Name { get; set; }
        public string RoleId { get; set; }
        public string LoginKeepYN { get; set; }
        public string UserGrade { get; set; }

        public CustomMemberShipUser(Freezer_User user)
            : base("CustomMembership", user.UserName, user.UserKey, user.Email, string.Empty, string.Empty, true, false, DateTime.Now, DateTime.Now, DateTime.Now, DateTime.Now, DateTime.Now)
        {
            UserKey = user.UserKey;
            EMail = user.Email;
            Name = user.UserName;
            RoleId = user.RoleId;
            LoginKeepYN = user.LoginKeepYN;
            UserGrade = user.UserGrade;
        }
    }
}