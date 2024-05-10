const {sequelize} = require('../database');
const { DataTypes } = require('sequelize');
const DistributorBrokerage=require("../models/distributorBrokerage.js")
const StatusMaster=require("../models/statusMaster.js")
const User=require("../models/User.js")

  const ProcessStatus = sequelize.define('processtatusdetails', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    distributorBrokerageId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    //   references: {
    //     model: DistributorBrokerage,
    //     key: 'id',
    //   },
    },
    userid:{
      type: DataTypes.BIGINT,

    },
    userremarks:{
      type: DataTypes.STRING,

    },
    processId: {
      type: DataTypes.BIGINT,
    //   allowNull: false,
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    //   references: {
    //     model: StatusMaster,
    //     key: 'id',
    //   },
    },
    makerId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    //   references:{
    //     model :User,
    //     key:"id"
    //   }
    },
    makerRemarks: {
      type: DataTypes.STRING,
    },
    checkerId: {
      type: DataTypes.BIGINT,
    //   references:{
    //     model :User,
    //     key:"id"
    //   }
    },
    checkerRemarks: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.INTEGER,
    //   allowNull: false,
    defaultValue:1,
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

module.exports=ProcessStatus;