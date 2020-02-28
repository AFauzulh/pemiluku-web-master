const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const CandidatePair = sequelize.define('candidatePair', {
    no_cp: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

module.exports = CandidatePair;