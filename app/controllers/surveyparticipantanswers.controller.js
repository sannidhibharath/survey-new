const db = require("../models");
const Surveyparticipantanswers = db.surveyparticipantanswers;
const Op = db.Sequelize.Op;
var mysql = require('mysql');
const util = require('util');
// Create and Save a new Track
var con = mysql.createConnection({
  host: "survey-db.cekydkanjmcc.us-west-1.rds.amazonaws.com",
  user: "admin",
  password: "surveyadmin",
  database: "survey_details"
});

const query = util.promisify(con.query).bind(con);

exports.createSurveyParticipantAns = async (req, res) => {

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

    const ansArray = req.body;
    let result = ansArray && ansArray.map(async data => {
      if (typeof (data.ans) == 'object') {
        data.ans = data.ans.join(",")
      }
      await query(`INSERT into survey_details.surveyparticipantanswers
    (surveyparticipantanswer_text,surveyquestionsId,createdAt
    )values('${data.ans}','${data.questionId}','${finalDate}')`);
    })


    await result;
    return res.send({ resultCode: 200, resultMessage: "Response recored" });

  } catch (error) {
    throw error;
  }
}

exports.getSurveyParticipantAnswers = async (req, res) => {
  const { surveyId } = req.query;

  try {

    const surveyParticipantAns = await query(`select count(1) as count,spa.surveyparticipantanswer_text,spa.surveyquestionsId,sq.surveyquestion_text  from 
    survey_details.surveyparticipantanswers spa inner join surveyquestions sq on spa.surveyquestionsId=sq.id  where sq.surveyId=${surveyId} group by surveyparticipantanswer_text`);
    if (surveyParticipantAns.length !==0) {
      let result = []
      surveyParticipantAns && surveyParticipantAns.map(data => {

        let existingData = result.find(res => res.surveyquestionsId === data.surveyquestionsId);

        if (existingData == undefined) {
          let obj = {
            surveyquestion_text: data.surveyquestion_text,
            surveyquestionsId: data.surveyquestionsId,
            totalCount: data.count,
            questionAns: [{ surveyparticipantanswer_text: data.surveyparticipantanswer_text, count: data.count, percentage: 0 }]
          }
          result.push(obj);
        }
        else {
          let index = result.findIndex(x => x.surveyquestionsId == existingData.surveyquestionsId);

          let res = result[index];
          let rawData = {}
          res.questionAns.push({ surveyparticipantanswer_text: data.surveyparticipantanswer_text, count: data.count });
          res.totalCount = res.totalCount + data.count;
          result[index] = res;

        }

      });
      const questionIdArray=[]
      result.map(data => {
        questionIdArray.push(data.surveyquestionsId);
        data.questionAns.map(res => {
          res.percentage = ((100 * res.count) / data.totalCount).toFixed(2);

        })

      })
      let remainingQuestions = await query(`select * from survey_details.surveyquestions where id NOT IN (${questionIdArray}) and surveyId = ${surveyId}`) 
      if(remainingQuestions.length !==0)
      {
        remainingQuestions && remainingQuestions.map(data =>{
          let obj = {
            surveyquestion_text: data.surveyquestion_text,
            surveyquestionsId: data.id,
            questionAns: [{ percentage: 0 }]
          }

        result.push(obj);
        })
      }
      return res.send({ resultCode: 200, resultMessage: "Survey answer details", responseData: result });

    }
    return res.send({ resultCode: 201, resultMessage: "Survey answers details not found" });

  } catch (error) {
    throw error;
  }
}
