const {sequelize} = require('../database');
const { DataTypes } = require('sequelize');

  const ProcessDocumentDetails = sequelize.define('processdocumentdetails', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    distributorBrokerageId: {
      type: DataTypes.STRING,
    },
    processId: {
      type: DataTypes.STRING,
    },
    folderPath: {
        type: DataTypes.STRING,
    },
    fileName: {
        type: DataTypes.STRING,
    },
    fileExtension: {
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

module.exports=ProcessDocumentDetails;