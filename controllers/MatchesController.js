var matches= require('../model/matches.js');


function addMatches(req,res,next){
	matches.Matches.create({
     firstteam: req.body.firstteam,
     secondteam:req.body.secondteam,
     sportstype:req.body.sportstype,
     date:req.body.date,
     time:req.body.time
  


	})
	.then(function(result){
next({"status":"201", "message":"Match added successfully"});


})
.catch(function(err){
 
next({"status":500, "message": "Failed to add matchesss"});

}) ;




};


function viewmatches(req,res,next){
 matches.Matches.findAll()
 .then(function(result){
  res.json(result);



 }).catch(function(err){

 	next();
 });

}

module.exports={
	addMatches,viewmatches
}