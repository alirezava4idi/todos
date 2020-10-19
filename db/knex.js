const knex = require("knex");
const connection = knex({
	client: "mysql",
	connection: {
		host: process.env.DBHOST,
		user: process.env.DBUSER,
		password: process.env.DBPASS,
		database: process.env.DBNAME,
	},
});

module.exports = connection;