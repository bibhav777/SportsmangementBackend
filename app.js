var express= require('express');
var myapp=express();
var controller= require('./controllers/UserController.js');
var bodyParser= require('body-parser');

myapp.use(function(req,res,next){
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

next();


})


myapp.use(bodyParser.json());
myapp.post('/v1/registration',controller.validator,controller.hashGenerator,controller.registerUser, function(req,res,next){
 res.status(201);
 res.send({"message":"Registered"})

});


myapp.use(function(err,req,res,next){

res.status(err.status);
res.send({"message":err.message});


})




myapp.listen(3001);