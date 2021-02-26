// require('dotenv').config({path : ''})
const express = require('express')
const app= express()
require('./config/db')


const participationRoute = require('./routes/partcipant')
const adminRoute = require('./routes/admin')

app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use('/participant',participationRoute)
app.use('/admin',adminRoute)


app.listen(3000,()=>console.log('server run'))
module.exports = app