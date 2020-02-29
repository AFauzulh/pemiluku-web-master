const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Misi = sequelize.define('Misi', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    misi: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'Misi'
});

module.exports = Misi;