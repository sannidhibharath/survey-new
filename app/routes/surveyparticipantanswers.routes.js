const Router = require('express-promise-router');

const controller = require('../controllers/surveyparticipantanswers.controller.js')

module.exports = () => {
    const router = Router({ mergeParams: true });
    
    router.route('/createSurveyParticipantAns').post(controller.createSurveyParticipantAns);
    router.route('/getSurveyParticipantAnswers').get(controller.getSurveyParticipantAnswers);

    return router;
};