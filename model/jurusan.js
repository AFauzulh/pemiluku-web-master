const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Jurusan = sequelize.define('Jurusan', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    namaJurusan: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'Jurusan'
});

module.exports = Jurusan;