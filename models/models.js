const db = require('../db');
const {DataTypes} = require('sequelize');

const User = db.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING, allowNull: false}
});

const Product = db.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false}
});

const Category = db.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const Manufacture = db.define('manufacture', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
});

const UserProduct = db.define('user_product', {
    count: {type: DataTypes.INTEGER}
});

Category.hasMany(Product);
Manufacture.hasMany(Product);

User.belongsToMany(Product, {through: UserProduct});
Product.belongsToMany(User, {through: UserProduct});

module.exports = {
    User,
    Product,
    Category,
    Manufacture,
    UserProduct
}