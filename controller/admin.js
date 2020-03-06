const Admin = require('../model/admin');
const Candidate = require('../model/candidate');
const Visi = require('../model/visi');
const Misi = require('../model/misi');
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
            admin: req.session.admin,
            message: false,
            error: false
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
        const candidates = await sequelize.query(
            'SELECT * FROM candidates', {
                type: sequelize.QueryTypes.SELECT
            }
        );
        res.render('admin/chart', {
            paslon: candidates
        });
    } catch (error) {
        console.log(err);
    }
};

exports.getAddCalon = async (req, res) => {
    if (req.session.admin) {
        res.render('admin/register-calon', {
            message: false,
            error: false
        });
    } else {
        res.render('admin/login', {
            message: 'Silahkan Login Terlebih dahulu !',
            error: true
        });
    }
};

exports.postAddCalon = async (req, res) => {
    const {
        nim,
        nama,
        no_paslon,
        visi
    } = req.body;
    const image = req.file.path;
    const misi = req.body.misi.split('\r\n');

    try {
        const candidate = await Candidate.create({
            NIM: nim,
            name: nama,
            no_paslon: no_paslon,
            image: image
        })
        if (candidate) {
            const candidateNIM = candidate.NIM;
            const visiCandidate = await Visi.create({
                visi: visi,
                CandidateNIM: candidateNIM
            });
            if (visiCandidate) {
                misi.map(async (m) => {
                    const misi = await Misi.create({
                        misi: m,
                        CandidateNIM: candidateNIM
                    });
                })
                res.render('admin/adminDashboard', {
                    message: 'Penambahan Data Calon Berhasil',
                    error: false
                });
            } else {
                res.render('admin/register-calon', {
                    message: 'Penambahan Gagal !',
                    error: true
                });
            }
            res.render('admin/adminDashboard', {
                message: 'Penambahan Data Calon Berhasil',
                error: false
            });
        } else {
            res.render('admin/register-calon', {
                message: 'Penambahan Gagal !',
                error: true
            });
        }
    } catch (error) {
        console.log(error);
        res.render('admin/register-calon', {
            message: 'Penambahan Gagal !',
            error: true
        });
    }
};