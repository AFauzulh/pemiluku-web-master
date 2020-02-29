const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Visi = sequelize.define('Visi', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    visi: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'Visi'
});


module.exports = Visi;