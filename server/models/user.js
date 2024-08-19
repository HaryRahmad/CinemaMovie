'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Ticket)

    }
  }
  User.init({
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:`username tidak boleh null`
        },
        notEmpty:{
          msg:`username tidak boleh kosong`
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      uniqueL:true,
      validate:{
        notNull:{
          msg:`email tidak boleh null`
        },
        notEmpty:{
          msg:`email tidak boleh kosong`
        },
        isEmail:{
          msg:`data yang anda masukan bukan email`
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:`password tidak boleh null`
        },
        notEmpty:{
          msg:`password tidak boleh kosong`
        },
        len:{
          args: [5, Infinity],
          msg:`password kurang dari 6 kata`
        }
      }
    },
    
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate(user, option){
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};