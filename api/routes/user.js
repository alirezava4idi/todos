const express = require("express")

const validator = require("validator");
const bcrypt = require("bcrypt");

const router = express.Router()

const queries = require("../../db/queries")

router.post("/api/users", async (req, res) => {
	let user = req.body;
	
	if ("email" in user && "password" in user && Object.keys(user).length == 2) {
		if (!validator.isEmail(user.email) && user.email.trim() != "") {
			res.send({ error: true, message: "Invalid Email Address" });
		} else if (user.password.trim() == "") {
			res.send({ error: true, message: "Invalid Password" });
		} else {
			// put in database
			const email = user.email.trim();
			const password = user.password.trim();
			const saltRounds = 8;
			let hash = await bcrypt.hash(password, saltRounds);
			user.password = hash;			
			queries.users.create(user).then(result => {
				console.log("No problem")
				res.json({"error": false, "message": "You are a member now!"})
			}).catch(err => {
				// console.log(err)
				if(err.errno == 1062){
					res.json({"error": true, "message": "Email already exists!"})
				}
			})
			
		}
	} else {
		res.send({ error: true, message: "Invalid form request" });
	}
});



router.get("/api/users/:id", (req, res) => {
	queries.users.getOne(req.params.id).then(user => {
		res.json(user)
	})
})

module.exports = router