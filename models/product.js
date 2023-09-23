'use strict';
const {
  Model
} = require('sequelize');
const url = require('url');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.BIGINT,
    image: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    imageUrl: {
      type: DataTypes.VIRTUAL,
      get(){
        if(this.image){
          return url.resolve('http://localhost:5000', this.image);
        }
        return null;
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
    paranoid:true
  });
  return Product;
};