const { DataTypes } = require('sequelize');
const { connect } = require('../config/index');

const products = connect.define('products', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    images: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id',
        },
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cpu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    main: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ram: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    storage: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gpu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    power: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    case: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    coolers: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

products.belongsTo(categories, { foreignKey: 'category' });

products
    .sync({ force: false })
    .then(() => {
        console.log('products table has been created.');
    })
    .catch((err) => {
        console.error('Unable to create table:', err);
    });

module.exports = products;
