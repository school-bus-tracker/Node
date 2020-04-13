const express = require('express');
const mongoose = require('mongoose');

const parents = require('./routes/parents');
const students = require('./routes/students');
const drivers = require('./routes/drivers');
const schools = require('./routes/schools');
const locations = require('./routes/locations');
const buses = require('./routes/buses');
const busRoutes = require('./routes/busroutes');
const schoolAdmins = require('./routes/schooladmins');
const superUsers = require('./routes/superusers');
const dailyAttendances = require('./routes/dailyattendances');

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost/untitled')
        .then(()=>console.log('mongodb connected successfully'))
        .catch(()=>new Error('DB connection failed'));


const app = express();

app.use(express.json());
app.use('/api/parents',parents);
app.use('/api/students',students);
app.use('/api/drivers',drivers);
app.use('/api/schools',schools);
app.use('/api/locations',locations);
app.use('/api/buses',buses);
app.use('/api/busroutes',busRoutes);
app.use('/api/schooladmins',schoolAdmins);
app.use('/api/superusers',superUsers);
app.use('/api/dailyattendances',dailyAttendances);

const port = process.env.PORT || 3000;

app.listen(port,()=>console.log(`Listening at port ${port}`));