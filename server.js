/**
* Setup empty JS object to act as endpoint for all routes
*
*/
projectData = {};

/**
* @description Express, Body-Parser and CORS Setup
* @descirption Require to run the server and use Body-parser and CORS
*
*/

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/**
* Middleware
* @description Configure express to use body-parser as middle-ware.
*
**/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
* CORS
* @description Configure CORS for express to use it
*
**/
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

/**
* @description Setup server
*
*/
const port = 3000;
const server = app.listen(port, listening);
function listening() {
      console.log(`running on localhost: ${port}`);
}

/**
* @description GET route
*
* @returns JS object created at the top of server code.
**/
app.get('/all', sendData);
function sendData(request, response) {
      response.send(projectData);
}

/**
* @desctiption POST route
*
* @descirption Add weather-data received from client-side to the projectData object
* @returns data received from client-side POST
*
**/
app.post('/weatherData', weatherData);
function weatherData(request, response) {
   const wData = request.body;
   const newWeatherData = {
     temperature: wData.temperature,
     date: wData.date,
     userResponse: wData.userResponse
   };
   projectData = newWeatherData;
   response.send(projectData);
}
