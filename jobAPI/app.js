require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const validateToken = require("./middleware/validateToken.js");

const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(express.json());

//Routes
app.use("/user",require("./routes/userRoute.js"));
app.use("/jobs", require("./routes/jobRoute.js"))





//connection to dbms
mongoose
  .connect("mongodb://localhost:27017/Login")
  .then(
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });
