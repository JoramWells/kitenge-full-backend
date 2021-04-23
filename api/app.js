const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/connection");
const cors = require("cors");
const axios = require("axios");
// const webpush = require('web-push')
const productRoutes = require("./routes/product");
const mpesaRoutes = require("./routes/safaricom-register");
const orderRoutes = require("./routes/order");

const User = require("./models/User");
const Order = require("./models/Orders");
// const Category = require('./models/Category')
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = "266388441735-5a4sfpj0lpk8nvjkf52ppoqqul0139st.apps.googleusercontent.com"
const client = new OAuth2Client(CLIENT_ID);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("uploads"));

//connect to database
db.authenticate()
  .then(() => console.log("Connected succesfully..."))
  .catch((err) => console.log(err));

// .then(async () => {
//   await User.sync({ force: true });
// });


// //user route
app.use("/user", require("./routes/user"));
//product route
app.use("/", productRoutes);

//M-PESA routes
app.use("/mpes", mpesaRoutes);
app.use("/payment", orderRoutes);

const getGoogle = async(req,res,next) =>{
  const token1 = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImRlOTU1NmFkNDY4MDMxMmMxMTdhZmFlZjI5MjBmNWY5OWE0Yzc5ZmQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjY2Mzg4NDQxNzM1LTVhNHNmcGowbHBrOG52amtmNTJwcG9xcXVsMDEzOXN0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjY2Mzg4NDQxNzM1LTVhNHNmcGowbHBrOG52amtmNTJwcG9xcXVsMDEzOXN0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTExMDc2NzQ0NjUxNDc2MjE5MjE0IiwiZW1haWwiOiJqb3JhbW1hbm9haDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJvdXZxQ096OGdrUHJkUTByVUVhTENRIiwibmFtZSI6ImpvcmFtIGJyYW11ZWwiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1sblJTVDhiWU1uQS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BTVp1dWNud1JxTW1UOWwzR2RicWZMRmVSRmFqYkh1OVVnL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJqb3JhbSIsImZhbWlseV9uYW1lIjoiYnJhbXVlbCIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjE4OTU0ODUzLCJleHAiOjE2MTg5NTg0NTMsImp0aSI6IjcxNjA5NDIxYTUwZDgxYTQ0OGIwZTNiYWQxMjhlYjExODRmNGRlMjkifQ.kDDZQAD1UzY-AjB2NtZDA-YMz3kQdp2B50gx11n6RaGvTQnOMy1WopVMyttwkoaAHO2nrwb1AETQ4Eg8UUnZnVhqhunkJ1qtvyiqtEg4MKgH0qrkUypplEvhgc5VPY-3qM3mzrEmyhVgb-ZQIyRAby7NwZVUj4WaGf-pWEZAy8WqGim3WTvqjYpDS3gJyUnJZu3WdtgAgslk_eX0CVl3NwxdjhELpwALjQPyaK4zlf-lkcpK5kgFri0OqPZ-YmSkdvcb7Fnh08ILPr0FFPWiuiJiKXk8IUhpqz0MWfYmTs8-ffkzSJDjXDSlNtyWwJsdEGC7IfFyve7CyxEAd2-ybw"

  await client.verifyIdToken({
    idToken:token1,
    audience:CLIENT_ID
  }).then(response=>{
    console.log(response.getPayload)
  }).catch(err=>console.log(err))
  next()

}

// app.use(getGoogle)

// app.post('/subscribe',(req,res)=>{
//   const subscription = req.body
//   res.status(201).json({})
//   const payload = JSON.stringify({title:'Hey there'})
//   webpush.sendNotification(subscription, payload).catch(err=>console.log(err))

// })






app.post('/getToken',getGoogle,async (req,res)=>{
  const token1 = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImRlOTU1NmFkNDY4MDMxMmMxMTdhZmFlZjI5MjBmNWY5OWE0Yzc5ZmQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjY2Mzg4NDQxNzM1LTVhNHNmcGowbHBrOG52amtmNTJwcG9xcXVsMDEzOXN0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjY2Mzg4NDQxNzM1LTVhNHNmcGowbHBrOG52amtmNTJwcG9xcXVsMDEzOXN0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA1NzU3NzQyMzI1MjQ3MTUyNzg4IiwiZW1haWwiOiJiZXRoaWx1c2FoNzVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiItbmlVQnc5X2kyc1lUMUxlVU9rVzFBIiwibmFtZSI6IkJldGggSWx1c2FoIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tUFlaNi1xcE5WZzgvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQU1adXVjbWRObkoycGtjeVJneExKZ0Zja203a2dfOEVyUS9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiQmV0aCIsImZhbWlseV9uYW1lIjoiSWx1c2FoIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2MTkxMTg3ODUsImV4cCI6MTYxOTEyMjM4NSwianRpIjoiNjg1MzFjMTI1OGFiZjNkOGFlYTcyOTg5M2MwYTM5Njk1YzEwMDYyNyJ9.b4FySim86odKXVSBOcDt4L4v-bbS2Zd_Mq3MFMa6Ar3HkHxqmrCyC8gsoDkIf41dQVsg2Z9sQXoB9yZZssYneMNqiT0dt7uCygUJjX2_CNm_nHraWDt02hV7yJXJlVv5KQoqYkCmvCD6l7Ho2_Oiu6hE2m_42F5g5kyM8yVaZgg4X-B7zs1YWFGDJ29_ZtnC090hstp6HRGDV8mE7WHMX0vKiw5lqb6MKa3nAKLQjZ0hVHTOFhZLVOIwQNNflMZ2VFBhhVbBLav-cRUygtwS51OoH9l0R-zMj7IGHTiDHW3iQdZvm6L0ObYjsPP7DGNOxIbVXKbUgxBIZ9o055jKzw"
  async function verify() {
    const ticket = await client.verifyIdToken({
        idToken: req.body,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    // console.log(payload.name)
    
    const userid = payload['sub'];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];

  }
  verify()
  .then(console.log("hey"))
  .catch(console.log);
  res.sendStatus(200)
  // console.log(req.body)
  
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
