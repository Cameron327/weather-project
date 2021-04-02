const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


// add an app.get with the route '/' so that something will be returned when the user goes to the home page
app.get('/', function(req, res) {

    // send the html page when the user loads up the webpage
    res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res) {
    console.log(req.body);
    console.log(req.body.cityName);

    // break down the endpoint url into parts to allow certain parts of it to be changed (dynamic instead of static)
    const city = req.body.cityName;
    const apiKey = "4d7a6e6ac08edf9e8d2dcd2712895d90";
    const unit = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&unit=" + unit;

    https.get(url, function(response) {
        console.log(response.statusCode);

        // this function is used to basically unpack the JSON object that we got and putting it back into a readable JSON object using .parse
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;

            // convert to F
            var fahrenheitTemp = (temp - 273.15) * (9/5) + 32;

            const weatherDescription = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

            res.write("<p>The weather is currently " + weatherDescription + "</p>")
            res.write("<h1>The temp in " + city + " is " + fahrenheitTemp + " degrees Fahrenheit.</h1>");
            res.write("<img src=" + imageUrl + ">")
        });
    });

});


app.listen(3000, function() {
    console.log("Server started!");
});