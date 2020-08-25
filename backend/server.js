const express = require('express');
// const { Mongoose } = require('mongoose');

const app = express();

// Configure dotenv (Loads environment variable)
require('dotenv').config() ;

// Configure cors
const cors = require('cors')
app.use(cors())
app.use(express.json()) ;

const port = process.env.PORT || 5000 ;

// connect DB
const mongoose = require('mongoose') ;
const uri = process.env.ATLAS_URI ;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('database connected!')
})

// Routes
const agendaPostRouter = require('./routes/agenda') ;
app.use('/agenda', agendaPostRouter) ;

app.listen(port, () => {
    console.log(`app running on port ${port}`)
})
