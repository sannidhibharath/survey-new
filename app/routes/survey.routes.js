


const Router = require('express-promise-router');

const controller = require('../controllers/survey.controller');

module.exports = () => {
    console.log("user routes");
    const router = Router({ mergeParams: true }); 
    
    router.route('/createSurvey').post(controller.createSurvey); 
    router.route('/surveyList').get(controller.surveyList); 
    router.route('/surveyDetailsBySurveyId').post(controller.surveyDetailsBySurveyId); 
    router.route('/deleteSurveyById').delete(controller.deleteSurveyById); 
    router.route('/updateSurvey').put(controller.updateSurvey); 

    return router;  
};