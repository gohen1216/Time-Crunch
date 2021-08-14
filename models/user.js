///
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt'); //reomove this from userRoute



class user extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

user.init(
{
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlphanumeric: true,
            len: [3,18], 
            isUppercase: true,

        },
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true,
        },
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len: [7,10],
            isAlphanumeric: true,
            },

    },

},

{
    hooks: {
        beforeCreate: async (newuserData) => {
          newuserData.password = await bcrypt.hash(newuserData.password, 10);
          return newuserData;
        },
        beforeUpdate: async (updateduserData) => {
          updateduserData.password = await bcrypt.hash(updateduserData.password, 10);
          return updateduserData;
        },
    },
    
    
    sequelize,
    timeStamp : false,
    underscored : true,
    modelName : 'user',
    freezeTableName : true,
}

);

module.exports = user;