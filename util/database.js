const Sequelize = require('sequelize');


const sequelize = new Sequelize('db-pemiluku', 'root', "require('firs')", {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;