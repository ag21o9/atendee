var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/Atendee';
mongoose.connect(mongoDB);

const schema  = mongoose.Schema({
  username : String,
  roll : Number
})

let usercheck = {};

async function check(req, res, next) {
  const usermodel = mongoose.model(new Date().toDateString(),schema);
  const name = await usermodel.findOne({ roll: req.body.roll });
  if (name != null) {
    res.redirect("/")
  } else if (req.body.name == "" || req.body.roll == "" || req.body.roll.toString().length<13) {
    res.redirect("/");
  } else {
    if (usercheck[req.headers.userID] == new Date().toDateString()) {
      res.redirect("/");
      // check
    } else {
      usercheck[req.headers.userID] = new Date().toDateString();
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
  const usermodel = mongoose.model(new Date().toDateString(),schema);
  const user = await usermodel.create({
    username: req.body.name,
    roll: req.body.roll,
  });
  res.render("Success", {users:user});
});

module.exports = router;
