const Router = require('express-promise-router');

const controller = require('../controllers/surveyquestions.controller');

module.exports = () => {
    console.log("que routes");
    const router = Router({ mergeParams: true });
    
    router.route('/createQuestion').post(controller.createQuestion);
    router.route('/questionListBySurveyId').get(controller.questionListBySurveyId); 
    router.route('/deleteQuestionById').delete(controller.deleteQuestionById);
    router.route('/bulkCreateSurveyQuestion').post(controller.bulkCreateSurveyQuestion);


    // router.route('/login').post(controller.login);

    return router;
};