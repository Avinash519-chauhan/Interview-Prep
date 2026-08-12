require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const interviewRoute = require("./routes/interviewRoute");
const aiRoute = require("./routes/aiRoute");
const attemptRoute = require("./routes/attemptRoute")

const app = express();
connectDB();

app.use(express.json());
app.use("/users", userRoute);
app.use("/categories", categoryRoute);
app.use("/interview", interviewRoute);
app.use("/ai", aiRoute);
app.use("/attempts", attemptRoute);

const PORT = process.env.PORT
app.listen(PORT, (err) => err ? console.log(err) : console.log(`Server is Running on PORT ${PORT}`));