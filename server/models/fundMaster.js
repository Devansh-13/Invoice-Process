const {sequelize} = require('../database');
const { DataTypes } = require('sequelize');

const FundMaster = sequelize.define('fundmaster', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    fundName: {
      type: DataTypes.STRING,
    },
    description1: {
      type: DataTypes.STRING,
    },
    description2: {
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

module.exports=FundMaster;