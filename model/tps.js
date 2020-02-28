const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Tps = sequelize.define('tps', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Tps;