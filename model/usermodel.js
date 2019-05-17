var db= require('../dbconfiguration/dbconfiguration.js');
const User= db.sequelize.define('user',{

id:{

type: db.Sequelize.INTEGER, 
allowNull: false,
autoIncrement: true,
primaryKey:true


},

username: {

	type: db.Sequelize.STRING,
	allowNull: false
},

email: {
    type: db.Sequelize.STRING,
    allowNull: false


},

password: {
    type: db.Sequelize.STRING,
    allowNull:false


}
},

//
{
  freezeTableName:true,
  tableName: 'user'

});


User.sync({force:false})
.then(function(result){
 console.log(result)  



})
.catch(function(err){

console.log(err)

})

module.exports={
   User

}





