const express = require('express');
const db = require("./config/db");
const userRouter = require('./routers/user.router');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use('/', userRouter);

app.listen(port,'0.0.0.0', () => {
  console.log(`API working on port ${port}`);
});
