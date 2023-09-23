'use strict';
const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const salt = bcrypt.genSaltSync(10)
   const passAdmin = bcrypt.hashSync('admin123', salt);
   const passUser = bcrypt.hashSync('user123', salt);
   return queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        email: 'admin@mail.com',
        phone: '0813459102312',
        isActive: true,
        password: passAdmin,
        role: "ADMIN"
      },
      {
        name: 'user',
        email: 'user@mail.com',
        phone: '0813459102312',
        isActive: true,
        password: passUser,
        role: "USER"
      }
   ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
