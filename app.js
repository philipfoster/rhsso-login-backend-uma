const express = require('express')
const router = require('express-router')
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const port = 3001
const app = express()

const helloRoute = require('./routes/hello')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', helloRoute)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

module.exports = app