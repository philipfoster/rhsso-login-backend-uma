let express = require('express');
let router = express.Router()

// app.get('/', (req, res) => res.send('Hello World!'))
router.get('/', function (req, res) {
  res.send('Hello from A!')
})

module.exports = router;
