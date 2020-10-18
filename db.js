var mysql = require("mysql");
require("dotenv").config();
var connection = mysql.createConnection({
	host: process.env.DBHOST,
	user: process.env.USER,
	password: process.env.DBPASS,
	database: process.env.DBNAME,
});



exports.connection = connection
