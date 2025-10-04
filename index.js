const express = require('express')


const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users')

const app = express()
app.use(express.json())


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