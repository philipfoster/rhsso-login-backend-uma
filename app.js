const express = require('express')
require('express-router');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const SamlStrategy = require('passport-saml').Strategy;
const passport = require('passport')

const port = 3001
const app = express()

const helloRoute = require('./routes/hello')
const authCallbackRoute = require('./routes/authCallback')
const loginRoute = require('./routes/login')

passport.use(new SamlStrategy(
    {
      path: '/login/callback',
      entryPoint: 'https://openidp.feide.no/simplesaml/saml2/idp/SSOService.php', // TODO: Find RHSSO entry point
      issuer: 'passport-saml'
    },
    function(profile, done) {
      console.log(`profile = ${profile}  \n done = ${done}`)
    })
);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', helloRoute)
app.use('/login/callback', authCallbackRoute)
app.use('/login', loginRoute)


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

module.exports = app