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
   player.Players.findAll(
  
)
   .then(function(result){
    res.json(result);


   })
   .catch(function(err){
    next();


   })


}
function getplayer(req,res,next){
player.Players.findOne({
where:{id:req.params.uid}

}).then(function(result){
   //console.log(result)
   res.status(200)

   res.json(result);

}).catch(function(){
next();

})



}
function updateplayer(req,res,next){
player.Players.update({
 fullname: req.body.fullname,
     dob:req.body.dob,
     address: req.body.address,
     sportsinvolved: req.body.sports,
     height: req.body.height,
     registersince: req.body.regisdate,
     position:req.body.position 
 
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


function deleteplayers(req,res,next){
player.Players.destroy({
       where:{id :req.params.uid}



}).then(function(){

res.status(200)
res.send({"message":"DELETED SUCCESSFULLY"})

}).catch(function(err){
next();



})



}



module.exports= {
	addPlayer,viewplayers,deleteplayers,getplayer,updateplayer
}