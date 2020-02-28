const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Admin = sequelize.define('Admin', {
    NIK: {
        type: Sequelize.CHAR(16),
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'Admin'
});

module.exports = Admin;