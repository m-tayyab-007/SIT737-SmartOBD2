const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const WebAppStrategy = require("ibmcloud-appid").WebAppStrategy;

module.exports = function (passport) {
  passport.use(new WebAppStrategy({
    tenantId: "0371dfb0-43b0-4e63-8e5a-654cd51031ff",
    clientId: "0755c040-798b-405c-97f3-f01b211cf1cc",
    secret: "MTdjNjhjYWYtNjNkNS00ZTIwLTg5N2YtZWNmZTJiMDBiNDJm",
    oauthServerUrl: "https://au-syd.appid.cloud.ibm.com/oauth/v4/0371dfb0-43b0-4e63-8e5a-654cd51031ff",
    redirectUri: "http://smartobd2-cloud.au-syd.mybluemix.net/ibm/cloud/appid/callback"
    }));
    passport.serializeUser(function(user, cb) {
      cb(null, user);
      });
   
   passport.deserializeUser(function(obj, cb) {
      cb(null, obj);
      });
};
