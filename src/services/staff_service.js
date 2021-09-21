'use strict';

const assert = require('assert-plus');
const _ = require('underscore');
const StandardError = require('../utils/standard_error');

const StaffService = function ({
    staffDAO
}){
    assert.object(staffDAO);

    this.staffDAO = staffDAO;
};

StaffService.prototype.createStaff = async function ( staffData ) {
    const {
        staffDAO
    } = this;

    const context = {
        ...staffData
    };

    try {
        // Why create only one variable and use it? this is for easier debugging
        const result = await staffDAO.create(staffData);

        return result;
    } catch (error) {
        throw StandardError(
            'INTERNAL_SERVER_ERROR', 
            'Unable to create staff data',
            {
                context,
                error
            }
        );
    }
};

StaffService.prototype.getById = async function ( staffId ) {
    const {
        staffDAO
    } = this;

    const context = {
        staff_id: staffId
    };

    try {
        const result = await staffDAO.getById(staffId);

        return result;
    } catch (error) {
        throw StandardError(
            'INTERNAL_SERVER_ERROR',
            'Unable to get staff data',
            {
                context,
                error
            }
        );
    }
};

StaffService.prototype.deleteById = async function ( staffId ) {
    const {
        staffDAO
    } = this;

    const context = {
        staff_id: staffId
    };

    try {
        const result = await staffDAO.getById(staffId);

        await staffDAO.deleteById(staffId);

        return {
            deleted: {
                ...result
            }
        };
    } catch (error) {
        throw StandardError(
            'INTERNAL_SERVER_ERROR',
            'Unable to delete staff data',
            {
                context,
                error
            }
        );
    }
};

StaffService.prototype.getMany = async function (query) {
    const {
        staffDAO
    } = this;

    const context = {
        query
    };

    try {
        const result = await staffDAO.getMany(query);
        return result;
    } catch (error) {
        throw StandardError(
            'INTERNAL_SERVER_ERROR',
            'Unable to search staff data',
            {
                context,
                error
            }
        );
    }
};


module.exports = StaffService;