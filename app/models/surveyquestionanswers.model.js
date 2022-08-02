module.exports = (sequelize, Sequelize) => {
    const Surveyquestions = sequelize.define("surveyquestionanswer", {
      // surveyquestion_id: {
      //   type: Sequelize.INTEGER
      // },
      surveyquestion_answer: {
        type: Sequelize.STRING
      }
    });
    return Surveyquestions;
  };