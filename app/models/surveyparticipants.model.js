module.exports = (sequelize, Sequelize) => { 
    const Surveyparticipants = sequelize.define("surveyparticipants", {
      surveyparticipants_email: {
        type: Sequelize.STRING
      },
      surveyparticipants_firstname: {
        type: Sequelize.STRING
      },
      surveyparticipants_lastname: {
        type: Sequelize.STRING
      },
      surveyparticipants_demographics: {
        type: Sequelize.STRING
      }
    });
    return Surveyparticipants;
  };