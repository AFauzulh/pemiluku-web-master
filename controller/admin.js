const Admin = require('../model/admin');
const Candidate = require('../model/candidate');
const CandidatePair = require('../model/candidatePair');
const sequelize = require('../util/database');

exports.getLoginAdmin = async (req, res) => {
    res.render('admin/login', {
        message: false,
        error: false
    });
};

exports.postLoginAdmin = (req, res) => {
    const {
        nim,
        password
    } = req.body;

    Admin.findOne({
            where: {
                nim: nim,
                password: password
            }
        })
        .then(admin => {
            if (admin) {
                req.session.admin = admin;
                res.redirect('/admin/dashboard');
            } else {
                res.render('admin/login', {
                    message: 'NIM atau Password Salah !',
                    error: true
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.redirect('/admin/login');
        })
};

exports.getAdminDashboard = async (req, res) => {
    if (req.session.admin) {
        res.render('admin/adminDashboard', {
            admin: req.session.admin
        });
    } else {
        res.render('admin/login', {
            message: 'Silahkan Login Terlebih dahulu !',
            error: true
        });
    }
};

exports.postLogoutAdmin = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.render('admin/login', {
                message: false,
                error: false
            });
        } else {
            res.render('admin/login', {
                message: false,
                error: false
            });
        }
    });
};

exports.getGrafik = async (req, res) => {
    try {
        const cp = await sequelize.query(
            'SELECT * FROM candidatepairs INNER JOIN candidates ON (candidatepairs.no_cp = candidates.CandidatePairNoCp)', {
                type: sequelize.QueryTypes.SELECT
            }
        );
        res.render('admin/chart', {
            paslon: cp
        });
    } catch (error) {
        console.log(err);
    }
};

exports.postAddCalon = async (req, res) => {
    const {
        nim,
        name,
        paslonNo
    } = req.body;
    const image = req.files;
};