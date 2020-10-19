require("dotenv").config();
// const db = require("./db")
const { json } = require("express")
const express = require("express")
const app = express()

const PORT = 3000

const users = require("./api/routes/user");


app.use(json());


app.use(users);



app.listen(process.env.PORT || PORT)