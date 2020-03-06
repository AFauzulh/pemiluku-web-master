const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Candidate = sequelize.define('Candidate', {
    NIM: {
        type: Sequelize.CHAR(15),
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    no_paslon: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Candidate;