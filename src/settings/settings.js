/** Module Imports */
const EXPRESS = require("express");
const BODY_PARSES = require("body-parser");
const CORS = require("cors");
const MORGAN = require("morgan")
const MSSQL = require("mssql");
const MULTER = require("multer");
const PATH = require("path");

/** Load Environmental Variables */
require('dotenv').config();

/** App Initialization */
const PORT = process.env.APPLICATION_PORT;
const APP = EXPRESS();

/** App's Logger Configuration */
APP.use(MORGAN(process.env.MORGAN_LOGGER_CONFIGURATION));

/** App's JSON Parser Configuration */
APP.use(BODY_PARSES.json());
APP.use(
  BODY_PARSES.urlencoded({
    extended: true
  })
);

/** App's Cross-Origin Resource Sharing (CORS) Configuration */
APP.use(CORS());

/** App's Database Configuration */
const dbConfiguration = {
  "user": process.env.DB_USER,
  "password": process.env.DB_PASSWORD,
  "server": process.env.DB_SERVER,
  "database": process.env.DB_DATABASE,
  "port": +process.env.DB_PORT
};

const POOL = new MSSQL.ConnectionPool(dbConfiguration)
  .connect()
  .catch(err => {
    if (err) {
      console.log("Error creating connection pool.");
      console.error(err);
    }
  });

/** App's Image Handling Configuration */

/** App's Static Files Configuration */
APP.use(EXPRESS.static(PATH.resolve(__dirname).split('settings')[0] + "public"));

/** Settings Module Exports */
module.exports = {
  APP,
  POOL,
  PORT
}
