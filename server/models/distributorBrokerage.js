// maker
const { DataTypes } = require('sequelize');
const {sequelize }= require('../database.js');
const DistributorMaster=require("../models/distributorMaster.js");
const ProcessStatus=require("../models/processStatus.js")

  const DistributorBrokerage = sequelize.define('distributorbrokerage', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    distributorMasterId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    //   references: {
    //     model: DistributorMaster,
    //     key: 'id',
    //   },
    },
    utrnumber:{
      type: DataTypes.BIGINT,
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    //   references: {
    //     model: ProcessStatus,
    //     key: 'id',
    //   },
    },
    fundId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    invoiceMonth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    basicAmount: {
      type: DataTypes.DECIMAL(20, 4),
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(20, 4),
      allowNull: false,
    },
    gstCategoryCode: {
      type: DataTypes.STRING,
    //   allowNull: false,
    },
    tdcCategoryCode: {
      type: DataTypes.STRING,
    //   allowNull: false,
    },
    feeTypeCode : {
      type: DataTypes.STRING,
    //   allowNull: false,
    },
    isActive: {
      type: DataTypes.INTEGER,
      defaultValue:1,
    //   allowNull: false,
    },
    createdBy: {
      type: DataTypes.BIGINT,
    //   allowNull: false,
    },
    createdDate: {
      type: DataTypes.DATE,
    //   allowNull: false,
    },
    updatedBy: {
      type: DataTypes.BIGINT,
    },
    updatedDate: {
      type: DataTypes.DATE,
    },
  });

module.exports=DistributorBrokerage;
