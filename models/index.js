///
const user = require('./user');
const appointment = require('./appointment');


user.hasMany(appointment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
  
appointment.belongsTo(user, {
    foreignKey: 'user_id'
});
  
  
  

module.exports = { user, appointment };
  