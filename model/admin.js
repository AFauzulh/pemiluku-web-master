const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Admin = sequelize.define('Admin', {
    NIM: {
        type: Sequelize.CHAR(15),
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