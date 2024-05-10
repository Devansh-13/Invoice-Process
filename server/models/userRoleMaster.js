const {sequelize} = require('../database');
const { DataTypes } = require('sequelize');

  const UserRolesMaster = sequelize.define('userRolesMaster', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.BIGINT,
    },
    roleCode: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.INTEGER,
      defaultValue:1,
    },
    createdBy: {
      type: DataTypes.BIGINT,
    },
    createdDate: {
      type: DataTypes.DATE,
    },
    updatedBy: {
      type: DataTypes.BIGINT,
    },
    updatedDate: {
      type: DataTypes.DATE,
    },
  });

module.exports=UserRolesMaster;