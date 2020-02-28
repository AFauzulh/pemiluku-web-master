const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Candidate = sequelize.define('candidate', {
    NIK: {
        type: Sequelize.CHAR(16),
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = Candidate;