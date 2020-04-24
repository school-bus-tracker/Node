const express = require("express");
const winston = require("winston");
const cors = require("cors");

const app = express();

app.use(cors());

require("./initializers/loginitializer")();
require("./initializers/configinitializer")();
require("./initializers/superusersinitializer")();
require("./initializers/routesinitializer")(app);
require("./initializers/dbinitializer")();
require("./initializers/productioninitializer")(app);
const port = process.env.PORT || 3000;

app.listen(port, () => winston.info(`Listening at port ${port}`));
