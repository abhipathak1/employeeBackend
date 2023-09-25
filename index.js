const express = require('express')
const {connection} = require('./db')
const { connect } = require('mongoose')
const {userRoute} = require('./Routes/User.Route')
const {empRoute} = require('./Routes/Employee.Route')
const cors = require('cors')
require('dotenv').config()


const app = express()
app.use(cors())
app.use(express.json())


app.use('/user',userRoute)
app.use('/employees',empRoute)



const PORT = process.env.PORT

app.listen(PORT, async(req, res)=>{
    try{
        connection
        console.log('Connected to DB')
    }catch(err){
        console.log('Not Connected with DB')
    }
    console.log(`Server is running at port no. ${PORT}`)
})