module.exports = {
  HOST: "survey-db.cekydkanjmcc.us-west-1.rds.amazonaws.com",
  USER: "admin",
  PASSWORD: "surveyadmin",
  DB: "survey_details",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};