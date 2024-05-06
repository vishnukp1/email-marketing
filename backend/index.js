const express = require('express');
const db = require('./src/db/db');
const routes=require("./src/routes/routes")
require('dotenv').config();

const app = express();

app.use(express.json());

app.use("/api",routes)


app.listen(3000, () => {
  console.log('Server started on port 3000');
});