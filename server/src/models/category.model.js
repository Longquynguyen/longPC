const { DataTypes } = require('sequelize');
const { connect } = require('../config/index');

const category = connect.define('category', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

category
    .sync({ force: false })
    .then(() => {
        console.log('category table has been created.');
    })
    .catch((err) => {
        console.error('Unable to create table:', err);
    });

module.exports = category;
