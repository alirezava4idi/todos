<style>
    header{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: aquamarine;
        align-content: center;
    }
    h1{
        color: black;
        margin-left: 12px;
    }
    ul{
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        list-style: none;
    }
    li{
        margin: 0 2em;
    }
    li:hover{
        color: aqua;
        cursor: pointer;
    }

    @media only screen and (max-width: 370px){
        h1{
            font-size: 25px;
        }
        li{
            margin: 0 1em;
        }

    }
</style>

<header>
    <h1>Notes App</h1>
    <ul>
        <li>Home</li>
        <li>About</li>
    </ul>
</header>