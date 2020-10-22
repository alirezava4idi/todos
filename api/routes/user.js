const express = require("express")

const validator = require("validator");
const bcrypt = require("bcrypt");

const router = express.Router()
const saltRounds = 8;

const queries = require("../../db/queries")

router.post("/api/users/signup", async (req, res) => {
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
			let hash = await bcrypt.hash(password, saltRounds);
			user.password = hash;			
			user.email = email
			queries.users.create(user).then(_result => {
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

router.post("/api/users/signin", (req, res) => {
	let user = req.body;
	if ("email" in user && "password" in user && Object.keys(user).length == 2) {
		if (!validator.isEmail(user.email) && user.email.trim() != "") {
			res.send({ error: true, message: "Invalid Email Address" });
		} else if (user.password.trim() == "") {
			res.send({ error: true, message: "Invalid Password" });
		} else {
			// check user in database
			const email = user.email.trim();
			const password = user.password.trim();
			user.email = email
			user.password = password
			
			queries.users.getByEmail(email).then(user => {
				if(user){	
					bcrypt.compare(password, user.password, (err, result) => {
						if(result){
							res.send({"error": false, "message": "You are now logged in!", "email": user.email, "user_id": user.id})
						}else{
							res.send({"error": true, "message": "Invalid username or password!"})
						}
					})
				}else{
					res.send({ error: true, message: "Invalid username or password!" });
				}
			}).catch(err => {
				res.send({ error: true, message: "Internal sever error!" });
			})
			
		}
	} else {
		res.send({ error: true, message: "Invalid form request" });
	}
})



router.get("/api/users/:id", (req, res) => {
	queries.users.getOne(req.params.id).then(user => {
		res.json(user)
	}).catch(_err =>{
		res.json({ error: true, message: "Internal sever error!" });
	})
})

router.patch("/api/users/:id", async (req, res) => {
	if(req.body.password && req.body.password.trim() != "") {
		let hash = await bcrypt.hash(req.body.password.trim(), saltRounds);
		queries.users
			.changePassword(req.params.id, hash)
			.then((result) => {
				res.json({"error": false, "message": "Password has been changed!"})
			}).catch(err => {
				res.json({"error": true, "message":"Internal sever error!"})
			});
	}else{
		res.json({"error": true, "message": "Invalid form data!"})
	}
	
})

module.exports = router