const path = require('path');

const sequelize = require('../util/database');

const Student = require('../model/student');

const Candidate = require('../model/candidate');

exports.getLogin = async (req, res) => {
    res.render('student/login', {
        error: false
    });
};

exports.getDashboard = async (req, res) => {
    if (!req.session.studentLoggedIn) {
        res.redirect('/student/login');
    } else {
        res.render('student/dashboard', {
            student: req.session.student,
            error: false,
            message: false,
        });
    }
};

exports.getPilih = async (req, res) => {
    if (!req.session.studentLoggedIn) {
        res.redirect('/student/login');
    }
    try {
        if (req.session.student.isAlreadyChose) {
            res.render('student/dashboard', {
                student: req.session.student,
                error: true,
                message: 'Anda Telah Memilih',
            });
        } else {
            const candidates = await sequelize.query(
                'SELECT * FROM Candidates ORDER BY no_paslon ASC', {
                type: sequelize.QueryTypes.SELECT
            });

            const visi = await sequelize.query('SELECT * FROM Visi', {
                type: sequelize.QueryTypes.SELECT
            });

            const misi = await sequelize.query('SELECT * FROM Misi', {
                type: sequelize.QueryTypes.SELECT
            });

            let i = 0;

            candidates.map((c) => {
                c.visi = visi[i].visi
                c.misi = [];
                i++;
            });

            for (let j = 0; j < i; j++) {
                misi.map((m) => {
                    if (candidates[j].NIM === m.CandidateNIM) {
                        candidates[j].misi.push(m.misi);
                    }
                })
            }
            res.render('student/pilih', {
                calon: candidates
            });
        }
    } catch (error) {
        console.log(error);
        res.render('student/dashboard', {
            student: req.session.student,
            error: true,
            message: 'Tidak Ada Event Pemilihan Saat ini',
        });
    }
};

exports.postLogin = async (req, res) => {
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
        .then(async (student) => {
            if (student) {
                const jurusan = await sequelize.query(`SELECT * FROM Jurusan WHERE id=${student.JurusanId}`, {
                    type: sequelize.QueryTypes.SELECT
                });

                student.jurusan = jurusan[0].namaJurusan;

                req.session.studentLoggedIn = true;
                req.session.student = student;
                res.render('student/dashboard', {
                    student: req.session.student,
                    error: false,
                    message: false,
                });
            } else {
                res.render('student/login', {
                    message: 'NIM atau Kode Token Salah !',
                    error: true
                });
            }
        })
        .catch(err => {
            console.log(err);
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
                student: req.session.student,
                error: false,
                message: 'Anda Telah Memilih',
            });
        } else {
            try {
                const candidate = await Candidate.findOne({
                    where: {
                        no_paslon: req.body.noPaslon
                    }
                });

                candidate.count = candidate.count + 1;
                const updatedCount = await candidate.save();

                const student = await Student.findByPk(req.session.student.NIM);

                student.isAlreadyChose = true;
                const updatedStudentStatus = await student.save();

                req.session.student = student;

                res.render('student/dashboard', {
                    student: req.session.student,
                    error: false,
                    message: 'Anda Telah Memilih',
                });
            } catch (error) {
                console.log(error);
            }
        }
    }
};