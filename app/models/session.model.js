module.exports = (sequelize, Sequelize) => {
    const Session = sequelize.define("session", {
      session_token: {
        type: Sequelize.STRING
      },
      session_start_datetime: {
        type: Sequelize.STRING
      },
      session_expiration_datetime: {
        type: Sequelize.STRING
      }
    });
    return Session;
  };