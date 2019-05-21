var usermodel =require('../model/usermodel.js');
var bcrypt= require('bcrypt');
var saltrounds=10;



function validator(req,res,next){
usermodel.User.findOne({
  where: {username:req.body.username}

})
.then(function(result){
	next("status":409, "message":"User already exists");

})
.catch(function(err){
 


})



}


function hashGenerator(req,res,next){
req.body.password //PLain text password from the frontend
bcrypt.hash(req.body.password, saltrounds)
.then(function(hash){
  console.log(hash);
  req.hashvalue =hash;
  next();
    
})
.catch(function(err){
  next({"status":500, "message":"DB problem"});
})
}

function registerUser(req,res,next){
     usermodel.User.create({
          username: req.body.username,
          email: req.body.email,
          password:req.hashvalue


     })
.then(function(result){
next();
})
.catch(function(err){
     next({"status":500 ,"message":"DB error"});

})
}

module.exports={
	registerUser,hashGenerator
}