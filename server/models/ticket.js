'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.belongsTo(models.User)
    }
  }
  Ticket.init({
    UserId:  {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg:`UserId tidak boleh null`
        },
        notEmpty:{
          msg:`UserId tidak boleh kosong`
        }
      }
    },
    movieId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          msg:`MovideId tidak boleh null`
        },
        notEmpty:{
          msg:`MovideId tidak boleh kosong`
        }
      }
    },
    status: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:`status tidak boleh null`
        },
        notEmpty:{
          msg:`status tidak boleh kosong`
        }
      }
    },
    title: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:`title tidak boleh null`
        },
        notEmpty:{
          msg:`title tidak boleh kosong`
        }
      }
    },
    price:  {
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:5000,
      validate:{
        notNull:{
          msg:`price tidak boleh null`
        },
        notEmpty:{
          msg:`price tidak boleh kosong`
        }
      }
    },
    cover:  {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:`decription tidak boleh null`
        },
        notEmpty:{
          msg:`decription tidak boleh kosong`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};