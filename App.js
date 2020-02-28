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
const People = require('./model/people');
const Tps = require('./model/tps');
const Admin = require('./model/admin');

const indexRoutes = require('./routes/index');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRoutes);

// Define database relationship
Tps.hasMany(People);
People.belongsTo(Tps);
CandidatePair.hasMany(People);
CandidatePair.hasMany(Candidate);
Candidate.belongsTo(CandidatePair);
Admin.hasOne(Tps);

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