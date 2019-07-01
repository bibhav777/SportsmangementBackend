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

function deletematches(req,res,next){
matches.Matches.destroy({
       where:{id :req.params.uid}



}).then(function(){

res.status(200)
res.send({"message":"DELETED SUCCESSFULLY"})

}).catch(function(err){
next();



})



}


function getmatches(req,res,next){
matches.Matches.findOne({
where:{id:req.params.uid}

}).then(function(result){
   //console.log(result)
   res.status(200)

   res.json(result);

}).catch(function(){
next();

})



}

function updatematches(req,res,next){
matches.Matches.update({

    firstteam: req.body.firstteam,
     secondteam:req.body.secondteam,
     sportstype:req.body.sportstype,
     date:req.body.date,
     time:req.body.time
},{
  where:{
  id : req.params.uid
}


})


.then(function(result,status){
// res.send("Matches updated successfully")
// res.status(201);
// next()
next({status:200,"message":"updated"});


}).catch(function(err){
  next();



}) 


}


module.exports={
	addMatches,viewmatches,deletematches,getmatches,updatematches
}