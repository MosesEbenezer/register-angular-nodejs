const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '.env' })
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
    next();
  });

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(cors());

//adding the routes
const mainRoutes = require('./routes/registration');

app.use('/', mainRoutes);

const atlasUrl = process.env.atlasUrl;

mongoose.connect(atlasUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
    if(err) {
        console.log('Not connected to the database: ' + err);
        
    } else {
        console.log('Successfully connected to the database');
        
    }
})

app.listen(process.env.PORT || 3000, (err) => {
    console.log('Server running on port 3000');
});
