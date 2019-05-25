var usermodel=require('../model/usermodel.js');
var bcrypt= require('bcrypt')

function validator(req,res,next){
   usermodel.User.findOne({
   
   where: {username: req.body.username}
})

   .then(function(){
     next();
})

   .catch(function(err){
   	next({"status": 400, "message":"Sorry! Please register first"});
})

}

function pwdcheck(req,res,next){
   usermodel.User.findOne({
       where: {username: req.body.username}


   })
   .then(function(result){
     console.log(result.dataValues);  
 
})
.catch(function(err){
    next({"status":500, "message":"Oops! Error occured"});


})

} 


module.exports={
	validator,pwdcheck
}