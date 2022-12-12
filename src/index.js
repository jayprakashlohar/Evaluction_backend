require("dotenv").config();
const express = require("express");
const { connection } = require("../config/db");
const { userRouter } = require("../Routers/User.route");
const { todoRouter } = require("../Routers/Todo.route");
const { authenticate } = require("../Middleware/Auth");
const cors = require("cors");

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

//connect backend to frontend
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Server Start Successfully...");
});

app.use(authenticate);

app.use("/", userRouter);
app.use("/todo", todoRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connect to db successfully !");
  } catch (err) {
    console.log(err);
  }
  console.log(`Listing to port ${PORT}`);
});
