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
exports.createQuestion = async (req, res) => {

  const { surveyId, surveyQuestionType, surveyQuestionText, surveyQuestionOptionDetails } = req.body;

  try {
    const todayDate = new Date();
    const month = todayDate.getMonth()
    const year = todayDate.getFullYear();
    const min = todayDate.getMinutes()
    const hours = todayDate.getHours()
    const seconds = todayDate.getSeconds()
    const day = todayDate.getDay()
    const finalDate = year + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + seconds;

    const insertRecord = await query(`INSERT into survey_details.surveyquestions
    (surveyId,surveyquestion_type,surveyquestion_text,createdAt)values
    ('${surveyId}','${surveyQuestionType}','${surveyQuestionText}','${finalDate}') `);


    if (insertRecord.affectedRows === 1) {
      const questionId = insertRecord.insertId;

      const insertAnswer = await query(`INSERT into survey_details.surveyquestionanswers
      (surveyquestionsId,surveyquestion_answer,createdAt)values
      ('${questionId}','${surveyQuestionOptionDetails}','${finalDate}') `);
      if (insertAnswer.affectedRows === 1) {

        return res.send({ resultCode: 200, resultMessage: "Added Question", responseData: { questionId: insertRecord.insertId } });
      }
    }
    return res.send({ resultCode: 201, resultMessage: "Something went wrong" });

  } catch (error) {
    throw error;
  }
};

exports.questionListBySurveyId = async (req, res) => {
  const { surveyId } = req.query;

  try {
    const result = await query(`SELECT * from survey_details.surveyquestions where surveyId='${surveyId}'`);
    if (result.length !== 0) {
      return res.send({ resultCode: 200, resultMessage: "User details", responseData: result });

    }
    return res.send({ resultCode: 201, resultMessage: "InValid Survey Id" });

  } catch (error) {
    throw error;
  }
};

exports.deleteQuestionById = async (req, res) => {
  const { questionId } = req.body;

  try {

    await query(`delete from survey_details.surveyquestionanswers where surveyquestionsId =${questionId}`);

    const deleteQuestion = await query(`delete from survey_details.surveyquestions where id =${questionId}`);

    if (deleteQuestion.affectedRows !== 0) {
      return res.send({ resultCode: 200, resultMessage: "Question Deleted" });
    }
    return res.send({ resultCode: 201, resultMessage: "Question not found" });

  } catch (error) {
    throw error;
  }
};

exports.bulkCreateSurveyQuestion = async (req, res) => {

  const { surveyId, questionDetails } = req.body;

  try {
    const todayDate = new Date();
    const newDate = new Date(todayDate);
    const month = todayDate.getMonth()
    const year = todayDate.getFullYear();
    const min = todayDate.getMinutes()
    const hours = todayDate.getHours()
    const seconds = todayDate.getSeconds()
    const day = todayDate.getDay()
    const finalDate = year + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + seconds

    const quesAnsDetails = [];
    const result = Promise.all(questionDetails.map(async item => {
      try {
        const insertRecord = await query(`INSERT into survey_details.surveyquestions
      (surveyId,surveyquestion_type,surveyquestion_text,surveyquestion_optiondetails,createdAt)values
      (${surveyId},'${item.surveyQuestionType}','${item.surveyQuestionText}','${item.surveyQuestionOptionDetails}','${finalDate}') `);

        console.log("insertRecord", insertRecord)
        if (insertRecord.affectedRows === 1) {
          const questionId = insertRecord.insertId;
          quesAnsDetails.push({ surveyquestionsId: questionId, surveyquestionAnswer: item.surveyQuestionOptionDetails });
        }

      } catch (error) {
        return res.send(error);
      }
    }))
    await result;
    console.log("quesAnsDetails", quesAnsDetails)
    Promise.all(quesAnsDetails.map(async item => {
      const insertAnswer = await query(`INSERT into survey_details.surveyquestionanswers
    (surveyquestionsId,surveyquestion_answer,createdAt)values
    ('${item.surveyquestionsId}','${item.surveyquestionAnswer}','${finalDate}') `);
    }))

    return res.send({ resultCode: 200, resultMessage: "Added Questions" });

  } catch (error) {
    throw error;
  }

};





