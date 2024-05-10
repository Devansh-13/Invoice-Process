const {sequelize }= require('../database');
const { DataTypes } = require('sequelize');

  const StatusMaster = sequelize.define('statusmaster', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    statusName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description1: {
      type: DataTypes.STRING(255),
      allowNull: true, // Allow null values
     
    },
    description2: {
      type: DataTypes.STRING(255),
      allowNull: true, // Allow null values
    },
    isActive: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allow null values
      defaultValue:1,
    },
    createdBy: {
      type: DataTypes.BIGINT,
      allowNull: true, // Allow null values
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: true, // Allow null values
    },
    updatedBy: {
      type: DataTypes.BIGINT,
      allowNull: true, // Allow null values
    },
    updatedDate: {
      type: DataTypes.DATE,
      allowNull: true, // Allow null values
    },
  });

module.exports=StatusMaster;
