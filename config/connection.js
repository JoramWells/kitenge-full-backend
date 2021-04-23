const Sequelize = require('sequelize')
module.exports = new Sequelize('kitenge','root','',{
    host:'localhost',
    dialect:'mysql',
})