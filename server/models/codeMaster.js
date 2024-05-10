const {sequelize} = require('../database');
const { DataTypes } = require('sequelize');

  const CodeMaster = sequelize.define('codemaster', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    module: {
      type: DataTypes.STRING,
    },
    Code: {
      type: DataTypes.STRING,
    },
    Value: {
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

module.exports=CodeMaster;