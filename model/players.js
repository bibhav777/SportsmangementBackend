var db= require('../dbconfiguration/dbconfiguration.js');
const Players= db.sequelize.define('Players',{

id:{

type: db.Sequelize.INTEGER, 
allowNull: false,
autoIncrement: true,
primaryKey:true


},

image: {
    type: db.Sequelize.STRING,
    allowNull:false


},

fullname: {

	type: db.Sequelize.STRING,
	allowNull: false
},

dob: {
    type: db.Sequelize.DATEONLY,
    allowNull: false


},

address: {
    type: db.Sequelize.STRING,
    allowNull:false


},
sportsinvolved: {
    type: db.Sequelize.STRING,
    allowNull:false


},
height: {
    type: db.Sequelize.INTEGER,
    allowNull:false


},

registersince: {
    type: db.Sequelize.DATEONLY,
    allowNull:false


},

position: {
    type: db.Sequelize.STRING,
    allowNull:false
}



},





{
  freezeTableName:true,
  tableName: 'players'

});


Players.sync({force:false})
.then(function(result){
 console.log(result)  



})
.catch(function(err){

console.log(err)

})

module.exports={
   Players

}





