var player= require('../model/players.js');

//sss//var uploads= multer({
 //dest: 'uploads'


//});


function addPlayer(req,res,next){

	player.Players.create({
     image: req.file.filename,
     fullname: req.body.fullname,
     dob:req.body.dob,
     address: req.body.address,
     sportsinvolved: req.body.sports,
     height: req.body.height,
     registersince: req.body.regisdate,
     position:req.body.position 


})
.then(function(result){
next();


})
.catch(function(err){
 
next({"status":500, "message": "Failed to add players"});

}) ;
};


function viewplayers(req,res,next){
   player.Players.findAll()
   .then(function(result){
    res.json(result);


   })
   .catch(function(err){
    next();


   })


}



module.exports= {
	addPlayer,viewplayers
}