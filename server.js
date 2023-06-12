require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const axios = require('axios');

const app = express();
let PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));
app.use(methodOverride("_method"));
const apiKey = 'b9f641a3ff497e00de5ebf498c0bf87a'

app.get('/', (req, res)=>{
    res.render('index')
})
app.post('/weather', (req, res)=>{
   const cityN = req.body.city
    const city ={
        name: '',
        temp: '',
        icon: '',
        humidity: '',
        wind: {
            speed: '',
            direction:''
        },
    }
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityN}&units=imperial&appid=${apiKey}`) 
     .then(response=>{
    const data = response.data
    city.name = cityN;
    city.temp = data.main.temp
    city.icon = data.weather[0].icon
    city.humidity = data.main.humidity
    city.wind.speed = data.wind.speed
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
     const index = Math.round(data.wind.deg / 45) % 8;
 
    city.wind.direction = directions[index]
    res.render('city', {city})

   })
   .catch(err=>{
    console.log(err)
   })    

    

})

app.listen(PORT, () => console.log("Server is running on port " + PORT));


