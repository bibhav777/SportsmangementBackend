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

module.exports={
	addMatches
}