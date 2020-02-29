const path = require('path');

const sequelize = require('../util/database');

const People = require('../model/people');

exports.getLogin = (req, res) => {
    res.render('people/login', {
        pageTitle: 'Login Page'
    });
};

exports.getDashboard = (req, res) => {
    res.render('people/dashboard');
};