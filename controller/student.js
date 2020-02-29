const path = require('path');

const sequelize = require('../util/database');

const Student = require('../model/student');

exports.getLogin = async (req, res) => {
    res.render('student/login', {
        pageTitle: 'halaman login'
    });
};

exports.getDashboard = (req, res) => {
    res.render('student/dashboard');
};