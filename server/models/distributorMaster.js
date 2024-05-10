const {sequelize }= require('../database');
const { DataTypes } = require('sequelize');

  const DistributorMaster = sequelize.define('distributormaster', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    distributorName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email:{
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    distributorPAN: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    distributorARN: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.INTEGER,
     
      defaultValue:1,
    },
    createdBy: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedBy: {
      type: DataTypes.BIGINT,
    },
    updatedDate: {
      type: DataTypes.DATE,
    },
  });

module.exports=DistributorMaster;
