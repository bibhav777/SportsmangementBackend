var express= require('express');
var myapp=express();
var multer= require('multer');
var controller= require('./controllers/UserController.js');
var authController=require('./controllers/AuthController.js');
var player=require('./controllers/PlayersController.js');
var bodyParser= require('body-parser');
var path= require('path');

var appstorage= multer.diskStorage({
destination: function(req,file,cb){
cb(null, 'uploads')
},

filename: (req, file, cb) => {
          cb(null,file.originalname + '-' + Date.now() +
               path.extname(file.originalname)); 
     }
});

var uploads= multer({storage: appstorage});


myapp.use(function(req,res,next){
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type,authorization');
res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

next();


})

myapp.use(bodyParser.json());

myapp.post('/v1/registration',controller.validator,controller.hashGenerator,controller.registerUser, function(req,res,next){
 res.status(201);
 res.send({"message":"User was successfully registered"});

});

myapp.post('/v1/login',authController.validator,authController.pwdcheck,authController.jwtToken,function(req,res,next			){
res.status(200);
res.send({"token":req.Token});
 



 
});

myapp.get('/v1/adminDashboard',authController.verifyToken,function(req,res){



});

myapp.post('/addplayers',uploads.single('image'),player.addPlayer,function(req,res,next){
res.status(201);
res.send({"message":"Player is successfully added"});


});

myapp.get('/viewplayers',player.viewplayers,function(req,res,next){
res.status(201);


});



myapp.use(function(err,req,res,next){
res.status(err.status);
res.send({"message":err.message});
})

myapp.listen(3001);