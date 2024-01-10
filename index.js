const express = require("express")
const{ connection } = require("./db")
const{ userRouter } = require("./routes/user.route")
const{ noteRouter } = require("./routes/notes.route")

const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json("this is home")
})

app.use("/users",userRouter)
app.use("/notes",noteRouter)


app.listen(4400, async()=>{
    try{
        await connection
        console.log("connection to database is complete")
        console.log("server is running on 4400 port")
    }
    catch(err){
        console.log(err)
    }
})