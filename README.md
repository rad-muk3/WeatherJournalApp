# WeatherJournalApp
This project combines data from the OpenWeatherMap API and client side (browser) HTML forms, to create a web app that records a weather journal for users.

Set up the project environment. 
1. Install Node.js
2. Install express, body-parser and CORS using  npm install command.

Server.js (Server side)
Require the above installed packages in the server.js and set an instance object to use them.
Add a GET route that returns the projectData object in the server code 
Add a POST route that adds incoming data to projectData.

App.js (Client Side)
Acquire API credentials from OpenWeatherMap website. 

Use the API credentials and the Base URL to create global variables 

Retrieve the weather data, then chain another Promise that makes a POST request to add the API data, as well as data entered by the user.

Chain another Promise that updates the UI dynamically.

PostWeatherDetails async function that is called after the completed POST request. 
This function should retrieve data from the app, select the necessary elements on the DOM, and then update their necessary values to reflect the dynamic values for: temperature, date and the Feelings input from the user.