const { json } = require("express")
const express = require("express")
const app = express()
const validator = require("validator")
const PORT = 3000

app.use(json());

app.post("/signup", (req, res) => {
    const user = req.body
    if("email" in user && "password" in user && Object.keys(user).length == 2){
        if (!validator.isEmail(user.email) && user.email.trim() != "") {
            res.send({"error": true, "message": "Invalid Email Address"})
		}else if(user.password.trim() == ""){
            res.send({"error": true, "message": "Invalid Password"})
        }else{
            // put in database
            const email = user.email.trim()
            const password = user.password.trim()
            res.send({email, password})
        }
    }else{
        res.send({"error": true, "message": "Invalid form request"});
    }
    
    
})

app.listen(process.env.PORT | PORT)