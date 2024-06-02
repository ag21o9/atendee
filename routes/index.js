var express = require('express');
const usermodel = require('./users');
var router = express.Router();

/* GET home page. */


let usercheck = {}
const date = new Date();
const data = date.toDateString();

function check(req,res,next){
  if(usercheck[req.headers.userID]==data){
    res.redirect('/submitted')
  }
  else{
    usercheck[req.headers.userID]=data;
    next();
  }
}


router.post('/submitted',(req,res)=>{
  res.send("submitted already")
})

router.post('/create',check, async function(req, res, next) {
  const user = await usermodel.create({
    username : req.body.name,
    roll : req.body.roll,
  })
  res.send(user);
});

module.exports = router;
