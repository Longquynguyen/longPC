const { DataTypes } = require('sequelize');
const { connect } = require('../config/index');

const User = connect.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '0',
    },
});

User.sync({ force: true })
    .then(() => {
        console.log('User table has been created.');
    })
    .catch((err) => {
        console.error('Unable to create table:', err);
    });

module.exports = User;
