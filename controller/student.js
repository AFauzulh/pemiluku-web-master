const path = require('path');

const sequelize = require('../util/database');

const Student = require('../model/student');

const CandidatePair = require('../model/candidatePair');

exports.getLogin = async (req, res) => {
    res.render('student/login', {
        error: false
    });
};

exports.getDashboard = async (req, res) => {
    if (!req.session.studentLoggedIn) {
        res.redirect('/student/login');
    } else {
        res.render('student/dashboard');
    }
};

exports.getPilih = async (req, res) => {
    if (!req.session.studentLoggedIn) {
        res.redirect('/student/login');
    }
    try {
        if (req.session.student.isAlreadyChose) {
            res.redirect('/student/dashboard');
        }
        const candidatePair = await sequelize.query(
            'SELECT * FROM candidatepairs INNER JOIN candidates ON (candidatepairs.no_cp = candidates.CandidatePairNoCp)', {
                type: sequelize.QueryTypes.SELECT
            });
        console.log(candidatePair);
        res.render('student/pilih', {
            calon: candidatePair
        });
    } catch (error) {
        console.log(error);
    }
};

exports.postLogin = (req, res) => {
    const {
        nama,
        nim,
        token
    } = req.body;

    Student.findOne({
            where: {
                name: nama,
                nim: nim,
                token: token
            }
        })
        .then(student => {
            if (student) {
                console.log(student);
                req.session.studentLoggedIn = true;
                req.session.student = student;
                res.redirect('/student/dashboard');
            } else {
                res.render('student/login', {
                    message: 'NIM atau Kode Token Salah !',
                    error: true
                });
            }
        })
        .catch(err => {
            res.render('student/login', {
                message: 'Database Error!',
                error: true
            });
        });
};

exports.postLogout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.redirect('/student/login');
        } else {
            res.redirect('/student/login');
        }
    });
}

exports.postLogoutStudent = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.redirect('/student/login');
        } else {
            res.redirect('/student/login');
        }
    });
}

exports.postPilihan = async (req, res) => {
    if (!req.session.student) {
        res.redirect('/student/login');
    } else {
        if (req.session.student.isAlreadyChose) {
            res.render('student/dashboard', {
                error: false,
                message: 'Anda Telah Memilih',
            });
        } else {
            try {
                const candidatePair = await CandidatePair.findByPk(req.body.noPaslon);
                candidatePair.count = candidatePair.count + 1;
                const updatedCount = await candidatePair.save();

                const student = await Student.findByPk(req.session.student.NIM);

                student.isAlreadyChose = true;
                const updatedStudentStatus = await student.save();

                req.session.student = student;

                res.redirect('/student/dashboard');
            } catch (error) {
                console.log(error);
            }
        }
    }
};