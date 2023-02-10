const path = require("path");
const sequelize = require(path.join(__dirname, '../config/connection'));
const seedUser = require('./users');
const seedPost = require('./posts');
const seedComment = require("./comments");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedPost();

  await seedComment();

  process.exit(0);
};

seedAll();