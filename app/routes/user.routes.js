


const Router = require('express-promise-router');

const controller = require('../controllers/user.controller');

module.exports = () => {
    console.log("user routes");
    const router = Router({ mergeParams: true });
    
    router.route('/createUser').post(controller.create);
    router.route('/login').get(controller.login);
    router.route('/getUserList').get(controller.getUserList);

    return router;
};
