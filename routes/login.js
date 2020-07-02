let express = require('express');
let passport = require('passport')
let router = express.Router()

router.get('/',
    passport.authenticate('saml', { failureRedirect: '/', failureFlash: true },
    function(req, res) {
      res.redirect('/');
    })
);

module.exports = router;
