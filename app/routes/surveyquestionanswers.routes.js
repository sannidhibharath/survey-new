const Router = require('express-promise-router');

const controller = require('../controllers/surveyquestionanswers.controller')

module.exports = () => {
    console.log("user routes");
    const router = Router({ mergeParams: true });
    
    router.route('/createQuestionAnswer').post(controller.createQuestionAnswer);
    return router;
};