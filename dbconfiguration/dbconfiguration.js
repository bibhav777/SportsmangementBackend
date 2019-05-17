var Sequelize= require('sequelize');
var sequelize= new Sequelize('practicedb','root','Degea1234!',{
 host: 'localhost',
 dialect: 'mysql',
 logging: false
  

});

sequelize.authenticate()
.then(function(result){

console.log('db connected sucessfully');

})
.catch(function(err){
	console.log(err);
});