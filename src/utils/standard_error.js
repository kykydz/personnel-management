'use strict';

const assert = require('assert-plus');

module.exports = function (errorCode, message, context) {
    assert.string(errorCode);
    assert.string(message);
    assert.object(context);

    return {
        error_code: errorCode,
        message: message,
        context
    };
};