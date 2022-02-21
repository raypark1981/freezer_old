using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using Freezer.Models;
using System.Data.Entity.Migrations;

namespace Freezer.CustomAuthentication
{
    public class AuthenticationDB : DbContext
    {
        public AuthenticationDB()
            : base("FreezerConnection")
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Freezer_User>()
                .HasKey(u => u.UserKey);
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Freezer_User> Users { get; set; }
        //public DbSet<Role> Roles { get; set; }

        public string GetNewUserKey()
        {
            using (AuthenticationDB dbContext = new AuthenticationDB())
            {
                var lastUserKey = (from u in dbContext.Users
                                    orderby u.UserKey descending
                                    select u.UserKey).FirstOrDefault();

                int ilastUserKey = string.IsNullOrEmpty(lastUserKey) ? 0 : Int32.Parse(lastUserKey);

                string strlastUserKey = (ilastUserKey + 1).ToString().PadLeft(8, '0');

                return strlastUserKey;
            }
        }
    }

    public sealed class Configuration : DbMigrationsConfiguration<AuthenticationDB>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(AuthenticationDB context)
        {
            // Whatever
        }
    }
}