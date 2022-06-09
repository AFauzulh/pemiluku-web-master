const Sequelize = require('sequelize');


const sequelize = new Sequelize('db-pemiluku', 'root', "", {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;