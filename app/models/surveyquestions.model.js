module.exports = (sequelize, Sequelize) => {
    const Surveyquestions = sequelize.define("surveyquestions", {
      surveyquestion_type: {
        type: Sequelize.STRING
      },
      surveyquestion_text: {
        type: Sequelize.STRING
      },
      surveyquestion_optiondetails: {
        type: Sequelize.STRING
      }

    });
    return Surveyquestions;
  };