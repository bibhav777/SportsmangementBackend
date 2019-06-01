var player= require('../model/players.js');

var multer= require('multer'); 
//var uploads= multer({
 //dest: 'uploads'


//});


var appstorage= multer.diskStorage({
destination: function(req,file,cb){
cb(null, 'uploads')
},
filename: function(req,file,cb){
 cb(null,'adff')
} 
});

var uploads= multer({storage: appstorage});

function addPlayer(req,res,next){

	player.Players.create({
     image: req.file.originalname,
     fullname: req.body.fullname,
     dob:req.body.dob,
     address: req.body.address,
     sports: req.body.sports,
     height: req.body.height,
     regisdate: req.body.regisdate,
     position:req.body.position 


})
.then(function(result){
next();


})
.catch(function(err){
 
next({"status":500, "message": "Failed to add players"});

}) ;
};



module.exports= {
	uploads,addPlayer
}