const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const People = sequelize.define('people', {
    NIK: {
        type: Sequelize.CHAR(16),
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    isAlreadyChose: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

module.exports = People;