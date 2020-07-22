
let express = require('express');
let router = express.Router()
let db = require('../item_db')



router.post('/', function (req, res) {
  const body = req.body
  body.forEach((item) => {
    console.log(item)
    db.insert(item)
  })

  res.setHeader("Content-Type", "application/json")
  res.send(JSON.stringify(db.getAllItems()))
})


module.exports = router;

//
// module.exports = function (req, res) {
//   const body = req.body
//   body.forEach((item) => {
//     console.log(item)
//     db.insert(item)
//   })
//
//   res.setHeader("Content-Type", "application/json")
//   res.send(JSON.stringify(db.getAllItems()))
// }