var express = require('express');
var router = express.Router();
const passport = require("passport")

const CLIENT_URL = "https://prathipan-authentication.netlify.app/user"

router.get("/login/success", (req, res) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        //   cookies: req.cookies
      });
    }
  });
  
  router.get("/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
      message: "failure",
    });
  });
  
  router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("https://prathipan-authentication.netlify.app");
  });

router.get("/google", passport.authenticate('google',{
    scope : ['profile']
}));

router.get(
    "/google/callback",passport.authenticate('google',{
      successRedirect: CLIENT_URL,
      failureRedirect: "/login/failed",
    })
  );

router.get("/github", passport.authenticate('github',{
    scope : ['profile']
}));

router.get(
    "/github/callback",passport.authenticate('github',{
      successRedirect: CLIENT_URL,
      failureRedirect: "/login/failed",
    })
  );

module.exports = router;