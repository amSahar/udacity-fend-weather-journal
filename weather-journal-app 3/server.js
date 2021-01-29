// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening (){
    console.log(`Server running on localhost:${port}`)
}

app.get('/all', (req, res)=> { 
    res.send(projectData);
});

app.post('/postData',(req,res)=>{ 

    let data=req.body;

    projectData["temp"]= data.temp;
    projectData["date"]= data.date;
    projectData["user_res"]= data.user_res;

    res.send(projectData);
});