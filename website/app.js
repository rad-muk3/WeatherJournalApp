/**
 * Define Global Variables
 *
 */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?";
const OPENWEATHERAPIKEY ="4ec3b912111494466808d91f10bf3488";
const apiKey = `&appid=${OPENWEATHERAPIKEY}`;

/**
 * helper functions
 * @description async get and post functions
 * @param baseURL,zipCode,apiKey
 *
 **/
const getWeatherDetails = async (baseURL, zipCode, apiKey) => {
  const request = await fetch(baseURL + zipCode + apiKey);
  try {
    const weatherInfo = await request.json();
    return weatherInfo;
  } catch (e) {
    console.log('error', e);
  }
};

/**
 *async POST method
 *
 **/
const postWeatherDetails = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};


/**
*
* async update UI method
**/
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const weatherData = await request.json();
    const lData = weatherData.length - 1;
    document.getElementById('date').innerHTML = weatherData[lData].date;
    document.getElementById('temp').innerHTML = weatherData[lData].temperature + ' &#8457;';
    document.getElementById('content').innerHTML = "Today's feeling: " + weatherData[lData].userResponse;
  } catch (e) {
    console.log('error', e);
  }
};

/**
* @description convert temperature from kelvin to degree Fahrenheit
*
* @returns - temperature in degreen Fahrenheit
**/
function kelvinToFahrenheit(k) {
  const fahrenheit = ((k - 273.15) * 1.8) + 32;
  return fahrenheit.toFixed(2);
}

/**
 * Helper functions - End
 * Click Event handler for generate button - Start
 *
 */

document.getElementById('generate').addEventListener('click', performAction);

/**
 * main function
 * @description async function of action performed when generate button clicked
 *
 */
async function performAction(e) {
  // get zip code that user entered
  let zipEntered = document.querySelector('#zip').value;
  let newZipCode = `zip=${zipEntered},us`;
  // Create a new date instance dynamically with JS
  let d = new Date();
  let newDate = d.toDateString();
  // get user response for "feelings"
  const userResponse = document.getElementById("feelings").value;
  // chain the promises
  getWeatherDetails(baseURL, newZipCode, apiKey)
    .then(function(weatherInfo) {
      postWeatherDetails('/weatherData', {
        temperature: kelvinToFahrenheit(weatherInfo.main['temp']),
        date: newDate,
        userResponse: userResponse
      });
    })
    .then(
      updateUI
    )
}
