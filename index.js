const express = require('express')
const dotenv = require('dotenv')

const dbconnection = require("./mongodbconnection")

const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users')



dotenv.config();

const app = express()
app.use(express.json())

dbconnection();


app.get('/',(req,res)=>{
    res.status(202).json({
        message:"home-page :-)"
    })
})

app.use('/users',usersRouter)
app.use('/books',booksRouter)

const PORT = 8081;

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})