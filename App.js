const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT | 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const sequelize = require('./util/database');
const Candidate = require('./model/candidate');
const CandidatePair = require('./model/candidatePair');
const Student = require('./model/student');
const Jurusan = require('./model/jurusan');
const Admin = require('./model/admin');

const indexRoutes = require('./routes/index');
const studentRoutes = require('./routes/student');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRoutes);
app.use('/student', studentRoutes)

// Define database relationship

// Jurusan memiliki banyak mahasiswa
Jurusan.hasMany(Student);

// Paslon terdiri dari 2 calon
CandidatePair.hasMany(Candidate);

// Paslon dipilih oleh banyak mahasiswa
CandidatePair.hasMany(Student);

// 1 Himpunan Jurusan hanya memiliki 1 admin
Admin.hasOne(Jurusan);

sequelize
    .sync({
        force: false
    })
    .then(result => {
        app.listen(PORT, () => {
            console.log(`Server is Running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    });