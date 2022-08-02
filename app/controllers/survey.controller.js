const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
var mysql = require('mysql');
const util = require('util');

var con = mysql.createConnection({
  host: "survey-db.cekydkanjmcc.us-west-1.rds.amazonaws.com",
  user: "admin",
  password: "surveyadmin",
  database: "survey_details"
});

const query = util.promisify(con.query).bind(con);

// Create and Save a new Artist
exports.createSurvey = async (req, res) => {
  const { surveyName, surveyIntroParagraph, surveyDescription, surveyStartDate, surveyEndDate, userId } = req.body;

  try {
    const todayDate = new Date();
    const month = todayDate.getMonth()
    const year = todayDate.getFullYear();
    const min = todayDate.getMinutes()
    const hours = todayDate.getHours()
    const seconds = todayDate.getSeconds()
    const day = todayDate.getDay()
    const finalDate = year + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + seconds;

    const checkEmailExistance = await query(`SELECT * from survey_details.users where id='${userId}'`);

    if (checkEmailExistance.length == 0) {
      return res.send({ resultCode: 201, resultMessage: `Invalid user id` });
    }

    const insertRecord = await query(`INSERT into survey_details.surveys
    (survey_name,survey_introparagraph,survey_description,survey_startdate,survey_enddate,userId,createdAt)values
    ('${surveyName}','${surveyIntroParagraph}','${surveyDescription}','${surveyStartDate}','${surveyEndDate}',${userId},'${finalDate}') `);

    if (insertRecord.affectedRows === 1) {
      return res.send({ resultCode: 200, resultMessage: "Added survey", responseData: { surveyId: insertRecord.insertId } });
    }
    return res.send({ resultCode: 201, resultMessage: "Something went wrong" });

  } catch (error) {
    throw error;
  }


};

exports.surveyList = async (req, res) => {
  const { userId,limit,offset } = req.query;
  try {
    const userRole = await query(`SELECT user_role from survey_details.users where id =${userId} `);
    if (userRole.length !== 0) {
      if (userRole[0].user_role == 'admin') {
        const result = await query(`SELECT * from survey_details.surveys where userId =${userId} LIMIT ${limit} OFFSET ${offset} `);
        const totalCount =await query(`SELECT Count(1) as totalcount from survey_details.surveys where userId =${userId}`); 

        if (result.length !== 0) {
          return res.send({ resultCode: 200, resultMessage: "Survey details", totalCount:totalCount[0].totalcount ,responseData: result });

        }
        return res.send({ resultCode: 201, resultMessage: "Survey details not found" });
      } else {

        const result = await query(`SELECT * from survey_details.surveys LIMIT ${limit} OFFSET ${offset}`);
        const totalCount =await query(`SELECT Count(1) as totalcount from survey_details.surveys`); 

        if (result.length !== 0) {
          return res.send({ resultCode: 200, resultMessage: "Survey details",totalCount:totalCount[0].totalcount, responseData: result });

        }
        return res.send({ resultCode: 201, resultMessage: "Survey details not found" });

      }
    } else {
      return res.send({ resultCode: 201, resultMessage: "Invalid User" });

    }

  } catch (error) {
    throw error;
  }
};

exports.surveyDetailsBySurveyId = async (req, res) => {
  const { surveyId } = req.body;

  try {
    let result = {};
    const checkSurvey = await query(`SELECT * from survey_details.surveys where id=${surveyId}`);

    if (checkSurvey.length == 0) {
      return res.send({ resultCode: 201, resultMessage: "Survey Details not found" });
    }
    const surveyQuestions = await query(`SELECT sq.id,sq.surveyquestion_type,sq.surveyquestion_text,sqa.surveyquestion_answer
    from survey_details.surveyquestions sq INNER JOIN survey_details.surveyquestionanswers
     sqa on sq.id = sqa.surveyquestionsId where sq.surveyId=${surveyId}`);

    surveyQuestions.map(data => {
      data.surveyquestion_answer = data.surveyquestion_answer.split(",")
    })

    return res.send({ resultCode: 200, resultMessage: "Survey Details", SurveyDetails: checkSurvey, QuestionDetails: surveyQuestions });

  } catch (error) {
    throw error;
  }
};

exports.deleteSurveyById = async (req, res) => {
  const { surveyId } = req.body;

  try {
    let result = {};

    await query(`delete from survey_details.surveyquestions where surveyId in (${surveyId})`);

    const deleteSurvey = await query(`delete from survey_details.surveys where id in (${surveyId})`);

    if (deleteSurvey.affectedRows !== 0) {
      return res.send({ resultCode: 200, resultMessage: "Survey Deleted" });
    }
    return res.send({ resultCode: 201, resultMessage: "Survey not found" });

  } catch (error) {
    throw error;
  }
};

exports.updateSurvey = async (req, res) => {
  const { surveyDetails, QuestionDetails } = req.body;

  try {

    const todayDate = new Date();
    const month = todayDate.getMonth()
    const year = todayDate.getFullYear();
    const min = todayDate.getMinutes()
    const hours = todayDate.getHours()
    const seconds = todayDate.getSeconds()
    const day = todayDate.getDay()
    const finalDate = year + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + seconds;


    await query(`update survey_details.surveys set 
    survey_name ='${surveyDetails.survey_name}',survey_introparagraph='${surveyDetails.survey_introparagraph}',
    survey_description='${surveyDetails.survey_description}',survey_startdate='${surveyDetails.survey_startdate}',
    survey_enddate='${surveyDetails.survey_enddate}',updatedAt='${finalDate}' where id = ${surveyDetails.id}`);



    const result = Promise.all(QuestionDetails && QuestionDetails.map(async item => {
      try {
        let quesAns = ''
        if (item.surveyquestion_type !== 'description') {
          quesAns = item.surveyquestion_answer.join();
        }
        if (item.id) {

          await query(`update survey_details.surveyquestions set 
        surveyquestion_type ='${item.surveyquestion_type}',surveyquestion_text='${item.surveyquestion_text}',
        updatedAt='${finalDate}' where id =${item.id}`);


          await query(`update survey_details.surveyquestionanswers set 
        surveyquestion_answer ='${quesAns}',
        updatedAt='${finalDate}' where surveyquestionsId=${item.id}`);

        }
        else {
          const insertRecord = await query(`INSERT into survey_details.surveyquestions
      (surveyId,surveyquestion_type,surveyquestion_text,createdAt)values
      (${surveyDetails.id},'${item.surveyquestion_type}','${item.surveyquestion_text}','${finalDate}') `);

          if (insertRecord.affectedRows === 1) {
            const questionId = insertRecord.insertId;

            const insertAnswer = await query(`INSERT into survey_details.surveyquestionanswers
        (surveyquestionsId,surveyquestion_answer,createdAt)values
        (${questionId},'${quesAns}','${finalDate}') `);

          }

        }

        return res.send({ resultCode: 200, resultMessage: "Survey Details updated" });


      } catch (error) {
        return res.send(error);
      }
    }))
    await result;

    return res.send({ resultCode: 201, resultMessage: "Survey not found" });

  } catch (error) {
    throw error;
  }
};


