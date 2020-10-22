require("dotenv").config();
// const db = require("./db")
const { json } = require("express")
const express = require("express")
const cors = require('cors')
const app = express()

const PORT = 3000

const users = require("./api/routes/user");
const todos = require("./api/routes/todo_lists")


app.use(json());
app.use(cors())


app.use(users);
app.use(todos)


app.listen(process.env.PORT || PORT)