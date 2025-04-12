const { DataTypes } = require('sequelize');
const { connect } = require('../config/index');

const apiKey = connect.define('apiKey', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    publicKey: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    privateKey: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

apiKey
    .sync({ force: false })
    .then(() => {
        console.log('apikey table has been created.');
    })
    .catch((err) => {
        console.error('Unable to create table:', err);
    });

module.exports = apiKey;
