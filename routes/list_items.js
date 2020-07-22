
let express = require('express');
let router = express.Router()
let db = require('../item_db')



router.get('/', function (req, res) {
  res.setHeader("Content-Type", "application/json")
  res.status(200)
  res.send(JSON.stringify(db.getAllItems()));
})

module.exports = router;
//
// module.exports = function (req, res) {
//   res.setHeader("Content-Type", "application/json")
//   res.status(200)
//   res.send(JSON.stringify(db.getAllItems()));
// }