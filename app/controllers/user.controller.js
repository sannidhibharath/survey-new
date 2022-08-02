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


exports.create = async (req, res) => {
  const { userEmail, userPassword, userFirstName, userLastName } = req.body;

  try {
    const todayDate = new Date();
    const newDate=new Date(todayDate);
    const month =todayDate.getMonth()
    const year=todayDate.getFullYear();
    const min=todayDate.getMinutes()
    const  hours=todayDate.getHours()
    const  seconds=todayDate.getSeconds()
    const day=todayDate.getDay()
    const finalDate =year+'-'+month+'-'+day+' '+hours+':'+min+':'+seconds
    const email=userEmail.toLowerCase();

    const checkEmailExistance = await query(`SELECT * from survey_details.users where user_Email='${email}'`);
    
    if (checkEmailExistance.length !==0) {
      return res.send({ resultCode: 201,resultMessage:`Email Id ${userEmail} is already exist,Please use another mail id` });
    }
    const insertRecord = await query(`INSERT into survey_details.users
    (user_Email,user_Password,user_Firstname,user_Lastname,createdAt,updatedAt,user_role)values
    ('${email}','${userPassword}','${userFirstName}','${userLastName}','${finalDate}','${finalDate}','admin')`);

    if (insertRecord.affectedRows === 1) {
      return res.send({ resultCode: 200,resultMessage:"Sign up Successful", responseData:{userId: insertRecord.insertId }});
    }
    return res.send("something went wrong");

  } catch (error) {
    throw error;
  }

}

exports.login = async (req, res) => {
  const { userEmail, userPassword } = req.query;

  try {
    const result = await query(`SELECT * from survey_details.users where user_Email='${userEmail}' and user_Password='${userPassword}'`);
    if (result.length !==0) {
      return res.send({ resultCode: 200,resultMessage:"User details", responseData: result });

    }
    return res.send({ resultCode: 201,resultMessage:"InValid user"});

  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

exports.getUserList = async (req, res) => {
  const { limit, offset,userId } = req.query;

  try {
    const userRole = await query(`SELECT user_role  from survey_details.users where id=${userId}`);
    console.log('userRole',userRole);
    if(userRole[0].user_role == 'super_admin')
    {
    const totalRecord = await query(`SELECT count(1) as totalcount  from survey_details.users `);
    if (totalRecord[0].totalcount !== 0) {
      const result = await query(`SELECT id,user_Email,user_Firstname,user_Lastname,user_role from survey_details.users LIMIT ${limit} OFFSET ${offset}`);
      return res.send({ resultCode: 200, resultMessage: "User details",totalCount:totalRecord[0].totalcount, responseData: result });

    }
    return res.send({ resultCode: 201, resultMessage: "User details not found" });

  }
  return res.send({ resultCode: 201, resultMessage: "You can't access this page" });

  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

