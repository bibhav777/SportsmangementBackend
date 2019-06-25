var express= require('express');
var myapp=express();
var multer= require('multer');
var controller= require('./controllers/UserController.js');
var authController=require('./controllers/AuthController.js');

var player=require('./controllers/PlayersController.js');
var matches= require('./controllers/MatchesController.js');
var matchmodel=require('./model/matches.js')
var bodyParser= require('body-parser');
var path= require('path');
var publicDir=require('path').join(__filename,'/uploads');
myapp.use(express.static(publicDir));	
myapp.use(express.static('public'));
myapp.use('/uploads',express.static(__dirname +'/uploads'));

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
myapp.get('/uploads',function(req,res,next){
res.send(publicDir);
console.log('asdasd');

})


myapp.post('/addmatches',matches.addMatches,function(req,res,next){
res.status(201);
res.send({"message":"Match is added successfuully"})


});
myapp.get('/viewmatches',matches.viewmatches,function(req,res,next){
res.status(201);


});

myapp.delete('/viewmatches/:uid',function(req,res){
console.log(req.params.uid);
matchmodel.Matches.destroy({
       where:{id :req.params.uid}



}).then(function(){

res.status(200)
res.send({"message":"DELETED SUCCESSFULLY"})

}).catch(function(err){
next();



})


});


myapp.use(function(err,req,res,next){
res.status(err.status);
res.send({"message":err.message});
})

myapp.listen(3001);