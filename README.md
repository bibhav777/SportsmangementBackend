SPORTS MANAGEMENT
Name: Beebhav Sapkota

CollegeID: 170010

Batch: 19C

"dependencies": {
    "body-parser": "^1.19.0",
    "chai": "^4.2.0",
    "chai-http": "^4.3.0",
    "chai-like": "^1.1.1",
    "chai-things": "^0.2.0",
    "express": "^4.17.0",
    "jsonwebtoken": "^8.5.1",
    "kill-port": "^1.5.1",
    "multer": "^1.4.1",
    "mysql2": "^1.6.5",
    "sequelize": "^5.8.6",
    "swagger-jsdoc": "^3.2.9",
    "swagger-ui-express": "^4.0.7"
  }
}

## List of Main Features
1.LOGIN
2.Register
3.Add,Update,Delete,Retrieve Players
4.Add,Update,Delete,Retrieve Matches
5.View matches schedules in frontend.

## API Documentation
myapp.post('/addplayers',uploads.single('image'),player.addPlayer,function(req,res,next){
res.status(201);
res.send({"message":"Player is successfully added"});


});

myapp.get('/viewplayers',player.viewplayers,function(req,res,next){
res.status(201);


});

});
myapp.get('/viewmatches',matches.viewmatches,function(req,res,next){
res.status(201);


});

myapp.delete('/deletematches/:uid',matches.deletematches,function(req,res){
console.log(req.params.uid);


});
# SportsmangementBackend
# SportsmangementBackend
