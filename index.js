const express = require('express');

const app = express();

require('./initializers/loginitializer')();
require('./initializers/configinitializer')();
require('./initializers/superusersinitializer')();
require('./initializers/routesinitializer')(app);
require('./initializers/dbinitializer')();
require('./initializers/productioninitializer')(app);
const port = process.env.PORT || 3000;

app.listen(port,()=>console.log(`Listening at port ${port}`));