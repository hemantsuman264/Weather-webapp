import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("Public"));

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req,res) => {
    // res.sendFile(__dirname + "/index.ejs")
    res.render("index.ejs");
});

app.post("/",async(req,res) => {
    let location = await req.body.city;
    let cntry1 = await req.body.country
    try {
        const result = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=6950ff2bc3084318a5b121329231409&q=${location},${cntry1}`);

        const city = result.data.location.name;
        const region = result.data.location.region;
        const ctry = result.data.location.country;
        const temp = result.data.current.temp_c;
        const desc = result.data.current.condition.text;
        const img_day = result.data.current.condition.icon;
  

        // container 3
        const real_feel = result.data.current.feelslike_c;
        const wind = result.data.current.wind_kph;
        const sunset = result.data.forecast.forecastday[0].astro.sunset;
        const sunrise = result.data.forecast.forecastday[0].astro.sunrise;
        const rain_chance = result.data.forecast.forecastday[0].day.daily_chance_of_rain;
        const uv = result.data.current.uv;

        // container 2 hourly forecast
        const hour = result.data.forecast.forecastday[0].hour;
        // const time = result.data.forecast.forecast.forecastday[0].hour[0].time.slice(11,17);      //.slice(0,11) for using only date
        res.render("index.ejs",{
            city: city,
            region: region,
            ctry: ctry,
            temp: temp,
            desc: desc,
            img_day: img_day,
            real_feel: real_feel,  
            wind: wind,
            sunset: sunset,
            sunrise: sunrise,
            rain_chance: rain_chance,
            uv: uv, 
            hour: hour,
        });
        // console.log(city,ctry);
        
    } catch (error) {
        console.log(error);
    }


});

app.listen(port,() => {
    console.log(`Listening on Port ${port}`);
});