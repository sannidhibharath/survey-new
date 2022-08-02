const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.survey = require("./survey.model.js")(sequelize, Sequelize);
db.surveyparticipants = require("./surveyparticipants.model.js")(sequelize, Sequelize);
db.surveyquestions = require("./surveyquestions.model.js")(sequelize, Sequelize);
db.surveyquestionanswers = require("./surveyquestionanswers.model.js")(sequelize, Sequelize);
db.surveyparticipantanswers = require("./surveyparticipantanswers.model.js")(sequelize, Sequelize);
//db.session.hasMany(db.users, { as: "users" });
db.session.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});
//db.album.hasMany(db.track, { as: "track" });
db.survey.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});
//db.album.hasMany(db.track, { as: "track" });
db.surveyparticipants.belongsTo(db.survey, {
  foreignKey: "surveyId",
  as: "survey",
});
//db.album.hasMany(db.track, { as: "track" });
db.surveyquestions.belongsTo(db.survey, {
  foreignKey: "surveyId",
  as: "survey",
});
db.surveyquestionanswers.belongsTo(db.surveyquestions, {
  foreignKey: "surveyquestionsId",
  as: "surveyquestions",
});
db.surveyparticipantanswers.belongsTo(db.surveyquestions, {
  foreignKey: "surveyquestionsId",
  as: "surveyquestions",
});
db.surveyparticipantanswers.belongsTo(db.surveyquestionanswers, {
  foreignKey: "surveyquestionanswersId",
  as: "surveyquestionanswers",
});
module.exports = db;