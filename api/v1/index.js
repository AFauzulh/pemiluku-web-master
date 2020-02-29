const sequelize = require('../../util/database');

const People = require('../../model/people');

exports.postInvertStatus = async (req, res) => {
    const people = await People.findByPk(req.body.nik);
    if (people) {
        people.isAlreadyChose = !people.isAlreadyChose;
        try {
            const inverted = await people.save();
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

exports.registerToTps = async (req, res) => {
    const token = Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 5);
    const people = await People.findByPk(req.body.nik);
    if (people) {
        if (people.isAlreadyChose) {
            return res.status(500).send('Anda Telah Memilih !');
        } else {
            if (people.tpId && people.token) {
                people.tpId = people.tpId;
                people.token = people.token;
            } else {
                people.tpId = 131;
                people.token = token;
            }
            try {
                const inverted = await people.save();
                return res.send({
                    status: 200,
                    token: people.token
                });
            } catch (error) {
                console.log(error);
                return res.send({
                    status: 500,
                    message: 'Gagal !'
                });
            }
        }
    } else {
        return res.send({
            status: 404,
            message: 'NIK anda tidak terdaftar'
        });
    }
};