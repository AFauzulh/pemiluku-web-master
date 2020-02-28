const sequelize = require('../util/database');

const People = require('../model/people');

exports.getIndex = (req, res) => {
    res.render('index', {
        pageTitle: 'Index Page'
    });
};

exports.getScanner = (req, res) => {
    res.render('scanner');
};

exports.postInvertStatus = async (req, res) => {
    const people = await People.findByPk(req.body.nik);
    if (people) {
        people.isAlreadyChose = !people.isAlreadyChose;
        try {
            const inverted = await people.save();
            return res.status(200).send();
        } catch (error) {
            return res.status(404).send();
        }
    } else {
        return res.status(404).send();
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
                return res.status(200).send({
                    token: people.token
                });
            } catch (error) {
                console.log(error);
                return res.status(500).send('Gagal !');
            }
        }
    } else {
        return res.status(404).send('NIK anda tidak terdaftar');
    }
};