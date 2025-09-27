const express = require('express')

const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(202).json({
        message:"home-page :-)"
    })
})

const PORT = 8081;

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})