const sequelize = require('../../util/database');

const Student = require('../../model/student');

exports.postInvertStatus = async (req, res) => {
    const student = await Student.findByPk(req.body.nik);

    if (student) {
        student.isAlreadyChose = !student.isAlreadyChose;
        try {
            const inverted = await student.save();
            return res.send({
                status: 200
            });
        } catch (error) {
            return res.send({
                status: 404
            });
        }
    } else {
        return res.send({
            status: 404
        });
    }
};

exports.registerToken = async (req, res) => {
    const token = Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 5);
    const student = await Student.findByPk(req.body.nim);

    if (student) {
        if (student.isAlreadyChose) {
            return res.status(500).send('Anda Telah Memilih !');
        } else {
            if (student.token) {
                student.token = student.token;
            } else {
                student.token = token;
            }
            try {
                const inverted = await student.save();
                return res.send({
                    status: 200,
                    token: student.token
                });
            } catch (error) {
                console.log(error);
                return res.send({
                    status: 500,
                    message: 'Database Error !'
                });
            }
        }
    } else {
        return res.send({
            status: 404,
            message: 'NIM anda tidak terdaftar'
        });
    }
};

exports.getPaslonData = async (req, res) => {
    try {
        const candidates = await sequelize.query(
            'SELECT * FROM candidates', {
                type: sequelize.QueryTypes.SELECT
            }
        );
        res.status(200).json({
            paslon: candidates
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error'
        });
    }
};