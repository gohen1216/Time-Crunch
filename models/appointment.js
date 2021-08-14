

//const { timeStamp } = require('console');
//const { type } = require('os');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class appointment extends Model {}

appointment.init(
{
    appointment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    appointmentName:{
        type:DataTypes.STRING

   },
    appointmentDay:{
        type: DataTypes.DATE

    },
    appointmentTime : {
        type: DataTypes.TIME
    },
    
    visitReason: {
        type: DataTypes.STRING
    },

    newPatient: {
        type: DataTypes.BOOLEAN
    },

    anyInsurance: {
        type: DataTypes.BOOLEAN
    },



},
{

    sequelize,
    timeStamp : false,
    underscored : true,
    modelName : 'appointment',
    freezeTableName : true,
},
)

module.exports = appointment;  