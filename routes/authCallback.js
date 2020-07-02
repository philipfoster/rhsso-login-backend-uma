let express = require('express');
let passport = require('passport')
let router = express.Router()
const bodyParser = require('body-parser');

router.post('/',
    bodyParser.urlencoded({ extended: false }),
    passport.authenticate('saml', { failureRedirect: '/', failureFlash: true },
      function(req, res) {
        res.redirect('/');
      }
));

module.exports = router