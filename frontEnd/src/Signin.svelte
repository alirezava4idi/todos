<script>
    import { user } from './stores.js';
    let message = ""
    let error = false
    async function form_submit(event){
        event.preventDefault()

        const email = document.querySelector("#email").value
        const password = document.querySelector("#password").value

        if(email.trim() == ""){
            
            document.querySelector("#message").style.display = "block"
            error = true
            message = "Email is Empty"
        }else if(password.trim() == ""){
            
            document.querySelector("#message").style.display = "block"
            error = true
            message = "Password is Empty"
        }else{
            error = false
            message = ""
            const data = {
                "email": email,
                "password": password
            }
            const response = await fetch("http://localhost:3000/api/users/signin", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            response.json().then(res => {
                document.querySelector("#message").style.display = "block"
                error = res.error
                message = res.message
                if(!error){
                    user.update(state => true)
                    localStorage.setItem('user', JSON.stringify(data))

                }
            })

        }

        
    }
</script>
<div class="container">
    <form id="form">
        <div class="form-input">
            <label for="email">Email</label>
            <input type="email" id="email" >
        </div>
        <div class="form-input">
            <label for="password">Password</label>
            <input type="password" id="password" >
        </div>
        <button type="submit" on:click="{form_submit}">Sign in</button>
    </form>
    <div id="message" class= {error ? 'error' : 'no-error'} >
        {message}
    </div>
</div>
<style>
    .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        margin: auto 1em;
    }
    form{
        display: flex;
        flex-direction: column;
    }
    .form-input{
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }
    input{
        padding: 5px 10px;
    }
    button{
        padding: 12px 16px;
        background-color: brown;
        color: wheat;
        cursor: pointer;
        border: none;
    }
    button:hover{
        background-color: rgb(124, 48, 48);
    }
    button:focus{
        border: none;
        outline: none;
        background-color: rgb(124, 48, 48);
    }
    #message{
        padding: 15px 20px;
        margin-top: 10px;
        display: none;
    }
    .error{
        background-color: crimson;
        color: white;
    }
    .no-error{
        background-color: green;
        color: white;
    }
    
    @media only screen and (min-width: 700px){
        .container{
            margin: auto 30%;
        }
    }
</style>