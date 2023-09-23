'use strict';

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
   return queryInterface.bulkInsert('Products',[
    {
      name: 'produk 1',
      price: 20000,
      image: 'gambar',
      isActive: true,
    },
    {
      name: 'produk 2',
      price: 2000000,
      image: '/public/images/product-1.png',
      isActive: true,
    },
    {
      name: 'produk 3',
      price: 500000,
      image: '/public/images/product-2.png',
      isActive: false,
    }
   ])
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
