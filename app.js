const express = require("express");
const https = require("https");

const app = express();


// add an app.get with the route '/' so that something will be returned when the user goes to the home page
app.get('/', function(req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Davis&appid=4d7a6e6ac08edf9e8d2dcd2712895d90";
    https.get(url, function(response) {
        console.log(response.statusCode);

        // this function is used to basically unpack the JSON object that we got and putting it back into a readable JSON object using .parse
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
        });
    });


    res.send("Server is running");
});




app.listen(3000, function() {
    console.log("Server started!");
});