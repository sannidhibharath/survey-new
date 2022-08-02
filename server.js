'use strict';

require("dotenv").config();
const express = require('express');
const app = express();
const apiRoutes = require('./routes')

app.use("/api", apiRoutes());

app.listen(process.env.PORT);
// const db = require("./app/models");
// db.sequelize.sync();
console.info(`server is running on port ${process.env.PORT}`)



