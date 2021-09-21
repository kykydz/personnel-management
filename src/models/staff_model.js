'use strict';

const {
    Model
} = require('sequelize');

const uuidv1 = require('uuid').v1;

module.exports = (sequelize, DataTypes) => {
    class Staffs extends Model {
        static associate(models) {
            // tbd for association
        }
    }
    
    Staffs.init({
        id: {
            primaryKey: true,
            type: DataTypes.STRING,
            defaultValue: function () {
                return uuidv1();
            }
        },
        name: {
            type: DataTypes.STRING
        },
        work_area: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
    }, {
        sequelize,
        modelName: 'staffs',
    });
    return Staffs;
};