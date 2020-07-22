let express = require('express');
let router = express.Router()



router.get('/', function (req, res) {
  res.setHeader("Content-Type", "application/json")
  res.status(200)
  res.send("{}");
})

module.exports = router;