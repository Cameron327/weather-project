const express = require("express");
const https = require("https");

const app = express();


// add an app.get with the route '/' so that something will be returned when the user goes to the home page
app.get('/', function(req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Davis&appid=4d7a6e6ac08edf9e8d2dcd2712895d90";
    https.get(url, function(response) {
        console.log(response);
    });


    res.send("Server is running");
});




app.listen(3000, function() {
    console.log("Server started!");
});