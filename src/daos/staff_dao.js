'use strict';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const assert = require('assert-plus');

const StaffDAO = function ({ db }) {
    assert.object(db);

    this.db = db;
};

StaffDAO.prototype.create = async function( staffData ) {
    assert.object(staffData);

    let staff;
    try {
        staff = await this.db.models.staffs.create(staffData);
    } catch (error) {
        throw new Error(error);
    }

    return staff.toJSONv2();
};

StaffDAO.prototype.getById = async function( id )  {
    assert.string(id);

    try {
        const result = await this.db.models.staffs.findOne({
            where: {
                id
            }
        });
        return result ? result.toJSONv2() : null;
    } catch (error) {
        throw new Error(error);
    }
};

StaffDAO.prototype.deleteById = async function( id )  {
    assert.string(id);

    try {
        const result = await this.db.models.staffs.destroy({
            where: {
                id
            }
        });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

StaffDAO.prototype.getMany = async function( query )  {
    assert.object(query);
    assert.optionalString(query.search);

    try {
        const result = await this.db.models.staffs.findAll({
            where: {
                [Op.or] : [
                    { name: { [Op.like]: `%${query.search}%` } },
                    { address: { [Op.like]: `%${query.search}%` } },
                    { work_area: { [Op.like]: `%${query.search}%` } }
                ]
            }
        });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = StaffDAO;