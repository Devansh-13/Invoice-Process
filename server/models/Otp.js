// models/OTP.js
const { DataTypes } = require('sequelize');
const {sequelize }= require('../database.js');

const OTP = sequelize.define('otp', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      
    },
    otp_code: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isactive: {
        type: DataTypes.INTEGER,
        allowNull:  true,
        defaultValue:1
        },
    createdby: {
        type: DataTypes.BIGINT,
        allowNull:  true
    },
    createddate: {
        type: DataTypes.DATE,
        allowNull:  true
    },
});

module.exports = OTP;
