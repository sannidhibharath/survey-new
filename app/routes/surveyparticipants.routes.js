const Router = require('express-promise-router');

const controller = require('../controllers/surveyparticipants.controller')

module.exports = () => {
    const router = Router({ mergeParams: true });  
    
    router.route('/createSurveyParticipant').post(controller.createSurveyParticipant);
    router.route('/bulkCreateSurveyParticipant').post(controller.bulkCreateSurveyParticipant);

    return router;
};