'use strict';

const Logger = require('../utils/init_logger');

const logger = new Logger(process.env.NODE_ENV);

module.exports = function (asyncHandler) {
    return function (req, res, next) {
        const response = asyncHandler(req);

        response
            .then(function (response) {

                logger.info('request log', {
                    req: {
                        headers: req.headers,
                        params: req.params,
                        path: req.path,
                        body: req.body
                    },
                    res: {
                        ...response
                    }
                });

                res.status(200).json(response);
            })
            .catch(function (err) {

                logger.info('request log', {
                    req: {
                        headers: req.headers,
                        params: req.params,
                        path: req.path,
                        body: req.body
                    },
                    res: {
                        ...response
                    },
                    err
                });

                res.status(500).json({
                    message: 'Server error. Something unexpected is happening. We are on it!',
                    ...err
                });
            });
    };
};