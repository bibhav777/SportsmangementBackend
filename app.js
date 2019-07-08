var express= require('express');
var myapp=express();
var multer= require('multer');
const swaggerJsdoc= require('swagger-jsdoc');
const swaggerUi= require('swagger-ui-express');
 
 var swaggerDefinition={
 info: {
    // API informations (required)
    title: 'Sports Management', // Title (required)
    version: 'v1', // Version (required)
    description: 'API Documentation', // Description (optional)
  },
  host:'localhost:3001', // Host (optional)
  basePath: '/', // Base path (optional)
  securityDefinition:{
  	bearerAuth:{
  		type:'apiKey',
  		name:'authorization',
  		scheme:'bearer',
  		in:'header'
  	}
  }
}

var options={

	swaggerDefinition, 
  apis: ['./app.js']

}

const swaggerSpec=swaggerJsdoc(options);
myapp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
/**
* @swagger
* /v1/registration:
*  post:
*   tags:
*    - Registration
*   name: Registration
*   produces: application/json
*   parameters: 
*   - name: user
*     in: body
*     schema:
*       type: object
*       properties: 
*        username:
*         type: string
*        email:
*         type: string
*        password:
*         type: string
*   responses:
*     201:
*       description: sucessfull  
*/


myapp.post('/v1/registration',controller.validator,controller.hashGenerator,controller.registerUser, function(req,res,next){
 res.status(201);
 res.send({"message":"User was successfully registered"});

});

myapp.post('/v1/login',authController.validator,authController.pwdcheck,authController.jwtToken,function(req,res,next			){
res.status(200);
res.send(
	{
		"token":req.Token,
		"message":"LOGIN SUCCESSFUL"
}
	);
 



 
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


myapp.get('/players/:uid',player.getplayer,function(req,res,next){



});
myapp.put('/updateplayers/:uid',player.updateplayer,function(req,res){
console.log(req.params.uid);


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

myapp.delete('/deletematches/:uid',matches.deletematches,function(req,res){
console.log(req.params.uid);


});


myapp.get('/matches/:uid',matches.getmatches,function(req,res,next){



});
myapp.put('/updatematches/:uid',matches.updatematches,function(req,res){
console.log(req.params.uid);


});


myapp.delete('/deleteplayers/:uid',player.deleteplayers,function(req,res){
console.log(req.params.uid);


});


myapp.use(function(err,req,res,next){
res.status(err.status);
res.send({"message":err.message});
})

myapp.listen(3001);
module.exports=myapp;