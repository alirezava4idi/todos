const express = require("express")
const queries = require("../../db/queries")
const router = express.Router()


router.get("/api/todos", async (req, res) => {
    const list = await queries.todos.getAllLists(req.body.user_id)
    res.json(list)
})

router.post("/api/todos/create", (req, res) => {
    const data = req.body
    if(data.user_id && data.name && data.name.trim().length < 100){
        data.name = data.name.trim()

        queries.todos.create(data).then(result => {
            res.json({"error": false, "message": result})
        }).catch(err => {
            res.json({"error": true, "message": "Internal Server Error!"})
        })
    }else{
        res.json({"error": true, "message": "Invalid form request!"})
    }
})

router.get("/api/todos/:id", (req, res) => {
    
})


module.exports = router