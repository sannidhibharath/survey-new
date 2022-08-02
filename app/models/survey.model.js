module.exports = (sequelize, Sequelize) => {
  const Survey = sequelize.define("survey", {
    survey_name: {
      type: Sequelize.STRING
    },
    survey_description: {
      type: Sequelize.STRING
    },
    survey_introparagraph: {
      type: Sequelize.STRING
    },
    survey_startdate: {
      type: Sequelize.STRING
    },
    survey_enddate: {
      type: Sequelize.STRING
    }
  });
  return Survey;
};