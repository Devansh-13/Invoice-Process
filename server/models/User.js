
const { DataTypes } = require('sequelize');
const {sequelize} = require('../database');

const User = sequelize.define('user', {
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
        },
    username: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    mobile_no: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    logintype: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    distributorid: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    loginfailcount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    isactive: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:1,
    },
    createdby: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    createddate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updatedby: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    updateddate: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

module.exports = User;
