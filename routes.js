// 'use strict';

// const express = require('express');
// const apiRouter = express.Router();
// const cookieParser = require('cookie-parser');
// const app = express();
// const cors = require("cors");

// // const userRouter = require('./modules/user/userRouter');
// const userRouter =require("./app/routes/user.routes.js");
// require("./app/routes/survey.routes.js");
// require("./app/routes/session.routes.js");
// require("./app/routes/surveyparticipants.routes.js");
// require("./app/routes/surveyquestions.routes.js");
// require("./app/routes/surveyquestionanswers.routes.js");
// require("./app/routes/surveyparticipantanswers.routes.js");

// console.log("main route");
// const bodyParser = require('body-parser');

// apiRouter.use(cookieParser());

// apiRouter.use(bodyParser.json());

// apiRouter.use(
//   cors({
//       origin: true,
//       credentials: true,
//   }),
// );

// apiRouter.use((req, res, next) => {
//     console.log("req");
//   console.log("req.headers['x-api-key']", req.headers['x-api-key'])
//   if (req.headers['x-api-key'] === apiKey) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST, OPTIONS");
//     res.header("Access-Control-Expose-Headers", ["x-redirect"]);
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-api-key");

//     return next();
//   }
//   else {
//     res.send('Unauthorised user access attempted');
//     res.end();
//   }
// }
// );


// module.exports = () =>
//   apiRouter
//     .use("/survey", userRouter())

//     // .all('*', () => {
//     //   throw new NotFoundError();
//     // });



'use strict';

const express = require('express');
const apiRouter = express.Router();
const cookieParser = require('cookie-parser');
const app = express();
const cors = require("cors");

const userRouter = require('./app/routes/user.routes');
const surveyRouter = require('./app/routes/survey.routes');
const questionRouter=require("./app/routes/surveyquestions.routes");
const questionAnswerRouter= require("./app/routes/surveyquestionanswers.routes.js");
const surveyparticipantsRouter= require("./app/routes/surveyparticipants.routes.js");
const surveyparticipantsanswerRouter =require("./app/routes/surveyparticipantanswers.routes")
const { apiKey } = require('./app/config/config')

const bodyParser = require('body-parser');

apiRouter.use(cookieParser());

apiRouter.use(bodyParser.json());

apiRouter.use(
  cors({
      origin: true,
      credentials: true,
  }),
);

apiRouter.use((req, res, next) => {
  console.log("req.headers['x-api-key']", req.headers['x-api-key'],"apiKey",apiKey)
  if (req.headers['x-api-key'] === apiKey) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST, OPTIONS");
    res.header("Access-Control-Expose-Headers", ["x-redirect"]);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-api-key");

    return next();
  }
  else {
    res.send('Unauthorised user access attempted');
    res.end();
  }
}
);


module.exports = () =>
  apiRouter
    .use("/survey", userRouter())
    .use("/surveydetails", surveyRouter())
    .use("/surveyQuestion", questionRouter())  
    .use("/surveyQuestionAnswer", questionAnswerRouter())
    .use("/surveyparticipants", surveyparticipantsRouter())
    .use("/surveyparticipantsanswer", surveyparticipantsanswerRouter())


    // .all('*', () => {
    //   throw new NotFoundError();
    // });

