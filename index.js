const db = require("./db")
const bcrypt = require("bcrypt")
const { json } = require("express")
const express = require("express")
const app = express()
const validator = require("validator")
const PORT = 3000

app.use(json());

app.post("/signup", async (req, res) => {
    const user = req.body
    if("email" in user && "password" in user && Object.keys(user).length == 2){
        if (!validator.isEmail(user.email) && user.email.trim() != "") {
            res.send({"error": true, "message": "Invalid Email Address"})
		}else if(user.password.trim() == ""){
            res.send({"error": true, "message": "Invalid Password"})
        }else{
            // put in database
            const saltRounds = 8;
            const email = user.email.trim()
            const password = user.password.trim()
            let hash = await bcrypt.hash(password, saltRounds);
            db.connection.connect((err) => {
                if (err) throw err;
                console.log("Connected!");
                var sql =
                        `INSERT INTO users (email, password) VALUES ('${email}', '${hash}')`;
                db.connection.query(sql, (err, result) => {
                    if (err) throw err;
                    console.log("1 record inserted");
                    res.send({"error": false, "message": "Your are a member now!"});
                });
            });
            
        }
    }else{
        res.send({"error": true, "message": "Invalid form request"});
    }
    
    
})

app.listen(process.env.PORT | PORT)