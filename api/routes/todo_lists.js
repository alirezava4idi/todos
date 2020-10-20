const express = require("express")
const queries = require("../../db/queries")
const router = express.Router()


router.get("/api/todos", async (req, res) => {
    if(req.body.user_id){
        const list = await queries.todos.getAllLists(req.body.user_id)
        res.json(list)
    }else{
        res.json({"error": true, "message": "Something wrong with your lists!"})
    }
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

router.post("/api/todos/:list_id", (req, res) => {
    if(req.params.list_id && req.body.data){
        const list_id = req.params.list_id;
        const data = req.body.data; 
        data.todo_list_id = list_id
        queries.todos.addToList(data).then(result => {
            res.json(result)
        }).catch( err => console.log(err))
    }else{
        res.json({"error": true, "message": "Invalid form input!"})
    }
    
})
router.patch("/api/todos/:list_id", (req, res) => {
	if (req.params.list_id && req.body.data) {
		const list_id = req.params.list_id;
		const data = req.body.data;
        for(let todo of data){
            queries.todos
                    .updateList(todo)
                    .then((result) => {
                        // res.json(result);
                    })
                    .catch((err) => console.log(err));
        }
        res.json({"error": false, "message": "List Updated!"});
		
	} else {
		res.json({ error: true, message: "Invalid form input!" });
	}
});

router.get("/api/todos/:list_id", (req, res) => {
    queries.todos.getOneList(req.params.list_id).then(result => {
        res.json({"error": false, "list": result})
    }).catch(err => res.json({"error": true, "message": "Internal server error!"}))
})


module.exports = router