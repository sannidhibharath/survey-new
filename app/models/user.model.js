module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("user", {
    user_Email: {
      type: Sequelize.STRING
    },
    user_Firstname: {
      type: Sequelize.STRING
    },
    user_Lastname: {
      type: Sequelize.STRING
    },
    user_Password: {
      type: Sequelize.STRING
    }
  });
  return Users;
};