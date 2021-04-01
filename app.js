const express = require("express");
const https = require("https");

const app = express();


// add an app.get with the route '/' so that something will be returned when the user goes to the home page
app.get('/', function(req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Davis&appid=4d7a6e6ac08edf9e8d2dcd2712895d90";
    https.get(url, function(response) {
        console.log(response.statusCode);
        console.log(response);

        // this function is used to basically unpack the JSON object that we got and putting it back into a readable JSON object using .parse
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

            res.write("<p>The weather is currently " + weatherDescription + "</p>")
            res.write("<h1>The temp in Davis, CA is " + temp + " Kelvin.</h1>");
            res.write("<img src=" + imageUrl + ">")
            res.send();
        });
    });

});




app.listen(3000, function() {
    console.log("Server started!");
});