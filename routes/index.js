var express = require("express");
const usermodel = require("./users");
var router = express.Router();

/* GET home page. */

let usercheck = {};
const date = new Date();
const data = date.toDateString();

async function check(req, res, next) {
  const name = await usermodel.findOne({ roll: req.body.roll });
  if (name != null) {
    res.redirect("/")
  } else if (req.body.name == "" || req.body.roll == "" || req.body.roll.toString().length<13) {
    res.redirect("/");
  } else {
    if (usercheck[req.headers.userID] == data) {
      res.redirect("/");
    } else {
      usercheck[req.headers.userID] = data;
      next();
    }
  }
}

router.get("/", (req, res) => {
  res.render("index");
});

router.get('/e',(req,res)=>{
  res.render("success")
})

router.post("/create", check, async function (req, res, next) {
  const user = await usermodel.create({
    username: req.body.name,
    roll: req.body.roll,
  });
  res.render("Success", {users:user});
});

module.exports = router;
