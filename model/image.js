const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Image = sequelize.define('Image', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Image;