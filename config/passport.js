const WebAppStrategy = require("ibmcloud-appid").WebAppStrategy;

module.exports = function (passport) {
  passport.use(new WebAppStrategy({
    tenantId: "0371dfb0-43b0-4e63-8e5a-654cd51031ff",
    clientId: "febf7d32-f1a2-4a8f-954b-46c6b860b1a1",
    secret: "NTRlMzViNDMtZjNhYy00MTYyLWI2NjYtMDEwYTQ5YjViZTRi",
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
