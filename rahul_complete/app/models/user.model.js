module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN
    },
    sex: {
      type: Sequelize.STRING
    },
    birthday: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    street: {
      type: Sequelize.STRING
    },
    job: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    }
  });

  return User;
};
