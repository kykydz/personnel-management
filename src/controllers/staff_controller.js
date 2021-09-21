'use strict';

const { body, param, query } = require('express-validator');
const _ = require('underscore');
const requestAsyncHandler = require('../utils/request_async_handler');

module.exports = app => {
    const {
        staffService,
    } = app;

    app.post(
        '/staff',
        [
            body('name', 'invalid type').exists().notEmpty().isString(),
            body('address', 'required name').exists().notEmpty().isString(),
            body('work_area', 'required work_area').exists().notEmpty().isString()
        ],
        requestAsyncHandler(
            async ( req ) => {
                /**
                 * pick should be move to use enums of custom request validation to 
                 * make it more clean
                 * pick here is used for double validating the input that we want to process
                 * */
                return await staffService.createStaff(_.pick(req.body, [
                    'name',
                    'address',
                    'work_area'
                ]));
            }
        )
    );

    app.get(
        '/staff/:staff_id',
        [
            param('staff_id', 'invalid staff_id').exists().notEmpty().isUUID()
        ],
        requestAsyncHandler(
            async ( req ) => {
                return await staffService.getById(req.params.staff_id);
            }
        )
    );

    app.delete(
        '/staff/:staff_id',
        [
            param('staff_id', 'invalid staff_id').exists().notEmpty().isUUID()
        ],
        requestAsyncHandler(
            async ( req ) => {
                return await staffService.deleteById(req.params.staff_id);
            }
        )
    );

    app.get(
        '/staffs',
        [
            query('search', 'invalid search').optional({checkFalsy: true}).isString()
        ],
        requestAsyncHandler(
            async ( req ) => {
                return await staffService.getMany(req.query);
            }
        )
    );
};