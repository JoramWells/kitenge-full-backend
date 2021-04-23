const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('../config/connection.js')
const userRoutes = require('../routes/user.js')
const productRoutes = require("../routes/product");
const mpesaRoutes = require("../routes/safaricom-register");
// const orderRoutes = require("../routes/order");
// const User = require('../models/User')
// const Order = require("../models/Order");
// const Category = require('../models/Category')
// const Products = require('../models/Products')


const app = express()
const PORT  = process.env.PORT || 5000

//Middleware functions
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("uploads"))


//Testing mysql connection connection
db.authenticate()
.then(()=>console.log('Connected to kitenge succesfully :('))
.catch((err)=>console.log(err))
  // .then(async()=>{
  //   await User.sync({force:true})
  //   await Products.sync({force:true})
  //   await Category.sync({force:true})
  //   await Order.sync({force:true})

  // })

  //Routes
  //***********Product,User,M-PESA ****************** */
app.use("/", productRoutes);
app.use("/user", userRoutes);
app.use("/mpes", mpesaRoutes);
// app.use("/payment", orderRoutes);



app.listen(()=>{
  console.log(`App runing on http://localhost/${PORT}`)
})