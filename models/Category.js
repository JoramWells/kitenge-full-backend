const Sequelize = require("sequelize");
const db = require("../config/connection");

//create model
const Category = db.define("category", {
  category: {
    type: Sequelize.STRING,
  },
});

Category.beforeSync(() => console.log("Creating category table.."));
Category.afterSync(() => console.log("Created category table!"));

module.exports = Category;
