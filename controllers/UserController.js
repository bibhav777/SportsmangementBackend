var usermodel =require('../model/usermodel.js');

function registerUser(req,res,next){
     usermodel.User.create({
          username: req.body.username,
          email: req.body.email,
          password:req.body.password


     })





.then(function(result){
  console.log(result);



})
.catch(function(err){
     console.log(err);

})
}

module.exports={
	registerUser
}