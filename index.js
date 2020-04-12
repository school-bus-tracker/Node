const express = require('express');
const parents = require('./routes/parents');
const students = require('./routes/students');
const drivers = require('./routes/drivers');
const schools = require('./routes/schools');
const locations = require('./routes/locations');
const buses = require('./routes/buses');
const busRoutes = require('./routes/busroutes');
const schoolAdmins = require('./routes/schooladmins');
const superUsers = require('./routes/superusers');

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

const port = process.env.PORT || 3000;

app.listen(port,()=>console.log(`Listening at port ${port}`));