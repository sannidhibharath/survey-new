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
  exports.createQuestionAnswer = async (req, res) => {

  const { surveyQuestionId, surveyQuestionAnswer } = req.body;

  try {
    const todayDate = new Date();
    const month =todayDate.getMonth()
    const year=todayDate.getFullYear();
    const min=todayDate.getMinutes()
    const  hours=todayDate.getHours()
    const  seconds=todayDate.getSeconds()
    const day=todayDate.getDay()
    const finalDate =year+'-'+month+'-'+day+' '+hours+':'+min+':'+seconds;

    const insertRecord = await query(`INSERT into survey_details.surveyquestionanswers
    (surveyquestionsId,surveyquestion_answer,createdAt)values
    ('${surveyQuestionId}','${surveyQuestionAnswer}','${finalDate}') `);

    if (insertRecord.affectedRows === 1) {
      return res.send({ resultCode: 200, resultMessage: "Added answer" });
    }
    return res.send({ resultCode: 201, resultMessage: "Something went wrong" });

  } catch (error) {
    throw error;
  }


};


