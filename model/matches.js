var db= require('../dbconfiguration/dbconfiguration.js');
const Matches= db.sequelize.define('Matches',{

id:{

type: db.Sequelize.INTEGER, 
allowNull: false,
autoIncrement: true,
primaryKey:true


},

firstteam: {
    type: db.Sequelize.STRING,
    allowNull:false


},

secondteam: {

	type: db.Sequelize.STRING,
	allowNull: false
},

sportstype: {
    type: db.Sequelize.STRING,
    allowNull: false


},

date: {
    type: db.Sequelize.DATE,
    allowNull:false


},
time: {
    type: db.Sequelize.STRING,
    allowNull:false


}




},





{
  freezeTableName:true,
  tableName: 'matches'

});


Matches.sync({force:false})
.then(function(result){
 console.log(result)  



})
.catch(function(err){

console.log(err)

})

module.exports={
   Matches

}
