const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT | 3000;

// Setting up Session
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const SessionStore = require('express-session-sequelize')(expressSession.Store);

const sequelize = require('./util/database');

const sequelizeSessionStore = new SessionStore({
    db: sequelize
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const Candidate = require('./model/candidate');
const CandidatePair = require('./model/candidatePair');
const Student = require('./model/student');
const Jurusan = require('./model/jurusan');
const Admin = require('./model/admin');
const Visi = require('./model/visi');
const Misi = require('./model/misi');
// const Image = require('./model/image');

const indexRoutes = require('./routes/index');
const studentRoutes = require('./routes/student');
const adminRoutes = require('./routes/admin');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(expressSession({
    secret: 'keep it secret!',
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: false
}));

app.use(indexRoutes);
app.use('/student', studentRoutes);
app.use('/admin', adminRoutes);

// Define database relationship

// Jurusan memiliki banyak mahasiswa
Jurusan.hasMany(Student);

// Paslon terdiri dari 2 calon
CandidatePair.hasMany(Candidate);

// Paslon dipilih oleh banyak mahasiswa
CandidatePair.hasMany(Student);

// 1 Paslon hanya memiliki 1 Visi
CandidatePair.hasOne(Visi);

// 1 Paslon bisa memiliki banyak Misi
CandidatePair.hasMany(Misi);

// 1 Paslon memiliki 1 gambar
// CandidatePair.belongsTo(Image);

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