'use strict';

require('dotenv').config();

const Server = require('./server');
const Logger = require('./utils/init_logger');
const env = process.env;
const dbConfig = require('./config/db_config')(env);

const StaffDAO = require('./daos/staff_dao');

const StaffService = require('./services/staff_service');

(
    async () => {

        //list of dependencies injections
        const logger = new Logger(env.NODE_ENV || 'local');

        try {
            const db = require('./utils/model_loader')(dbConfig, `${__dirname}/models`);

            //injection for DAO
            const staffDAO = new StaffDAO({ db });

            //injection for logic in service
            const staffService = new StaffService({ staffDAO });

            Server.start({
                env,
                db,
                logger,
                staffService
            });
        } catch (error) {
            logger.error('Server crashed or failed to start', {}, error);
            process.exit();
        }
    }
)();