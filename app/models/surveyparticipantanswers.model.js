module.exports = (sequelize, Sequelize) => {
    const Surveyparticipantanswers = sequelize.define("surveyparticipantanswers", {
      surveyparticipantanswer_text: {
        type: Sequelize.STRING
      }
    });
    return Surveyparticipantanswers;
  };