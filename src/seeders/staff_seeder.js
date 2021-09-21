'use strict';
require('dotenv').config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('staffs', [{
      id: require('uuid').v1(),
      name: 'Staff One',
      work_area: 'engineer',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('staffs', null, {});
  }
};
